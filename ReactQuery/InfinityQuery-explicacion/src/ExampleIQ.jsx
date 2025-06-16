import { useInfiniteQuery } from "@tanstack/react-query"
import { useEffect } from "react";
import useApiInfinityQuery from "./hooks/useApiInfinityQuery";

const fetchQueries = async({pageParam=1})=>{
  const query = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=10`);
  const fetchQ = await query.json();
  //console.log(fetchQ)
  return fetchQ;
}


export default function ExampleIQ() {
  const {data, isFetchingNextPage, fetchNextPage, hasNextPage} = useApiInfinityQuery("https://jsonplaceholder.typicode.com/posts", 
    {first:"_page",second:"_limit"}, undefined);
  // const {data, isFetchingNextPage, fetchNextPage, hasNextPage} = useInfiniteQuery({
  //   queryKey:['list'],
  //   queryFn:fetchQueries,
  //   getNextPageParam:(lastPage, pages)=>{
  //     return lastPage.length? pages.length+1:undefined
  //   }
  // });

  useEffect(()=>{
    console.log(data);
  },[data])

  return (
    <div>
      <ul>
        {
          data?.pages.map((page,i)=>(
            <div key={i}>
              {
                page.map(({id, title})=>(
                  <li key={id}>
                    {title}
                  </li>
                ))
              }
            </div>
          ))
        }
      </ul>
      <button onClick={()=>fetchNextPage()} disabled={!hasNextPage||isFetchingNextPage}>
        {isFetchingNextPage?"Cargando...":"Cargar mas"}
      </button>
    </div>
  )
}
