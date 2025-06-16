import { useQuery } from "@tanstack/react-query"

const onQuery = async({url, params})=>{
  const query = await fetch(`${url}?${params}`);
  if(!query.ok){
    throw new Error("Hubo un error", query.statusText);
  }
  return query.json();
}
export default function useQuerySec({url,params, queriesKey=[], ops={}}) {

  const query = useQuery({
    queryKey:queriesKey,
    queryFn:()=>onQuery({url: url, params:params}),
    ...ops
  });
  return (query);
}
