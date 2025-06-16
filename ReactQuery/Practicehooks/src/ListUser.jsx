import { useEffect } from "react";
import useApi from "./hooks/useApi"
import { useQuery } from "@tanstack/react-query";

const apiList = async()=>{
  //console.log(url);
  const fetching = await fetch("http://localhost/storemagic/controllers/user.api.php"); //segundo link de ngrock
  //console.log(fetching);
  if(!fetching.ok){
    throw new Error("Error en la peticion");
  }

  return fetching.json();
}

export default function ListUser({isUpdate=false, getData=()=>{}, isSelected=false}) {
  const {data, isFetching, isError, error, refetch} = useQuery({
    queryKey:['userQuery'],
    queryFn:apiList,
    //keepPreviousData:true
  });

  const dataUser = (id)=>{
    getData(id);
  }
  
  return (
    <div>
      <ul>
        {isFetching?<p>Cargando usuarios...</p>:
        isError?<p>{error.message}</p>:
          data?.map(({id, nombre})=>(
            <div key={id} className="contain-users">
              <li>{nombre}</li>
              {isUpdate&&
                <button onClick={()=>dataUser(id)} disabled={isSelected}>Actualizar</button>
              }
            </div>
          ))
        }
      </ul>
    </div>
  )
}
