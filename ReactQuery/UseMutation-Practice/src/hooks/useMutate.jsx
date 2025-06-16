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
export default function useMutate({url, method="POST", queryKey}) {
  const useQuery = useQueryClient();
  const mutation = useMutation({
    mutationFn:(params)=>onQuery(url,params,method),
    onSuccess:()=>{
      useQuery.invalidateQueries([queryKey]);
    }
  });
  return (mutation);
}
