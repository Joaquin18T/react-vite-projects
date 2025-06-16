import { useInfiniteQuery } from "@tanstack/react-query"

const fetchQueries = async({pageParam=1, url,first, second, parser, aditional=""})=>{
  const query = await fetch(`${url}?${aditional}&${first}=${pageParam}&${second}=5`);
  const fetchQ = await query.json();
  //console.log(`${url}?${first}=${pageParam}&${second}=5`);
  return parser?parser(fetchQ):fetchQ; //Si hay parseo, entonces llamamos al metodo, si no, retornamos directamente.
}

export default function useApiInfinityQuery(url, params, parser, aditional, propsAditional={}) {
  const valoresInfinity = useInfiniteQuery({
    queryKey:['users', params, parser],
    queryFn:({pageParam=1})=>fetchQueries({pageParam,url, ...params, parser, aditional}),
    getNextPageParam:(lastPage,pages)=>{
      return lastPage.length>0?pages.length+1:undefined;
    },
    ...propsAditional
  });

  return (valoresInfinity);
}
