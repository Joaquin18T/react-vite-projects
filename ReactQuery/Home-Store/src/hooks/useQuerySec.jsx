import { useQuery } from "@tanstack/react-query"

const onQuery = async({url, params})=>{
  const query = await fetch(`${url}?${params}`);
  if(!query.ok){
    throw new Error("Hubo un error", query.statusText);
  }
  return query.json();
}

/**
 * Hook personalizado tomando base el hook useQuery
 * @param {Object} param0 Objetos con props ya definidas. url:Url de la consulta - 
 * params: parametros que se necesitan (Tipo de dato: UrlSearchParams) -
 * queriesKey:Llave(s) para identificar la consulta. Tipo de dato: array -
 * ops:Opciones que necesitas agregar al useQuery (Opcional)
 * @returns Propiedades del useQuery
 */
export default function useQuerySec({url,params, queriesKey=[], ops={}}) {
  const query = useQuery({
    queryKey:queriesKey,
    queryFn:()=>onQuery({url: url, params:params}),
    ...ops
  });
  return (query);
}
