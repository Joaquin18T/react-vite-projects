import { useEffect } from "react";
import useApiInfinityQuery from "./hooks/useApiInfinityQuery"
import ButtonFetch from "./Components/ButtonFetch";


export default function Exe2() {
  const KEY = import.meta.env.VITE_UNSPLASH_KEY;
  //console.log(KEY);
  const {data, isFetchingNextPage, fetchNextPage, hasNextPage} = useApiInfinityQuery("https://api.unsplash.com/photos", 
  {first:"page", second:"per_page"},undefined, `client_id=${KEY}`);

  useEffect(()=>{
    console.log(data);
  },[data]);
  return (
    <div>
      <ButtonFetch isFetchNextPage={isFetchingNextPage} fetchNextPage={fetchNextPage} hasNextPage={hasNextPage}>
        {isFetchingNextPage?"Cargando fotos...":"Cargar mas fotos"}
      </ButtonFetch>
      <ul>
        {data?.pages.map((page, i)=>(
          <div key={i}>
            {
              page.map(({urls, id})=>(
                <li key={id}>
                  <img src={urls.thumb}/>
                </li>
              ))
            }
          </div>
        ))}
      </ul>
    </div>
  )
}
