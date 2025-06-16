import {useMutation, useQueryClient} from '@tanstack/react-query'
import { useEffect } from 'react';

const fetchApi = async(id)=>{
  await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
    method:'DELETE'
  });
  return id;
}

export default function DeleteMutation({id, setDelete}) {
  const querClient = useQueryClient();

  const {isPending, isError, error, isSuccess, mutate} = useMutation({
    mutationFn:fetchApi,
    onSuccess:(id)=>{ //este id viene de la mutacion (fetchApi)
      setDelete(true);
      querClient.setQueryData(["users"], (oldData)=>{
        return oldData?oldData.filter((user)=>user.id!==id):[]
      })
    }
  });

  
  const onDelete = ()=>{
    mutate(id);
    //if(!isSuccess) setDelete(false);
    console.log("usuario eliminado", id);
  }

  return (
    <div>
      <button onClick={onDelete} disabled={isPending}>
        {isPending?"Eliminando...":"Eliminar usuario"}
      </button>
      {/* {isSuccess&&<span>Usuario eliminado correctamente</span>} */}
      {isError&&<span>{error.message}</span>}
    </div>
  )
}
