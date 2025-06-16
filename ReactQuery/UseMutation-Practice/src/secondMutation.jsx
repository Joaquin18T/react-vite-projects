import { useEffect } from "react";
import useMutate from "./hooks/useMutate"

export default function SecondMutation() {
  const {data,isSuccess, error, isError, isPending, mutate} = useMutate(
    {url:"http://192.168.1.38/home-store/api/categoria.api.php", queryKey:"prodTest"}
  );

  useEffect(()=>{
    mutate({categoria:"Nuevo useMutation"});
  },[]);

  useEffect(()=>{
    console.log(data);
  },[isSuccess]); 

  return (
    <div>
      {isPending&&<span>Cargando...</span>}
      {isSuccess&&<span>Registrado</span>}
      {isError&&<span>{error.message}</span>}
    </div>
  )
}
