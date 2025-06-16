import { useEffect } from "react";
import useQuerySec from "./hooks/useQuerySec"


export default function SecondQuery() {
  const params = new URLSearchParams();
  params.append("categoria", "");
  params.append("page",2);
  params.append("limit",5);

  const {data,isLoading, isError, error, isSuccess} = 
  useQuerySec({url:"http://192.168.1.38/home-store/api/categoria.api.php",queriesKey:["queryCat"], params:params});

  useEffect(()=>{
    if(isSuccess){
      console.log(data);
    }
  },[isSuccess]);
  return (
    <div>
      {isLoading&&<span>Cargando...</span>}
      {isError&&<span>{error.message}</span>}
    </div>
  )
}
