import {useMutation, useQueryClient} from '@tanstack/react-query'

const onQuery = async(url,params, action)=>{
  const query = await fetch(url,{
    method:action,
    body:JSON.stringify(params)
  });
  if(!query.ok){
    throw new Error("Hubo un error");
  }
  return query.json();
}

const onLiteQuery = async(url, params)=>{
  const query = await fetch(`${url}?${params}`);
  if(!query.ok){
    throw new Error("Hubo un error");
  }
  return query.json();
}

/**
 * Hook personalizado que usa el useMutation como base.
 * @param {*} param0 Consta de un objeto con propiedades ya definidas (url, method, queryKey, typeQuery) -
 * url:Url del servicio externo. - 
 * method: metodo HTTP que se va a realizar (por defecto es POST) -
 * queryKey:Clave(s) para identificar la consulta -
 * typeQuery: Tipo de consulta donde el primero es obtener datos(2) y el otro modificar o registrar(1)
 * (Por defecto es 1) 
 * @returns Propiedades del useMutation.
 */
export default function useMutate({url, method="POST", queryKey, typeQuery=1}) {
  const useQuery = useQueryClient();
  const mutation = useMutation({
    mutationFn:(params)=>{
      let query = {};
      if(typeQuery===1){
        query = onQuery(url,params,method);
      }else if(typeQuery===2){
        query = onLiteQuery(url, params);
      }
      return query;
    },
    onSuccess:()=>{
      useQuery.invalidateQueries([queryKey]);
    }
  });
  return (mutation);
}
