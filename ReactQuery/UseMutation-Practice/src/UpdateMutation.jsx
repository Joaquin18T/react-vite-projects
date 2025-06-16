import React from 'react'
import useApiMutation from './hooks/useApiMutation'

export default function UpdateMutation({data,id}) {
  const {isError, error, mutate, isPending, isSuccess} = useApiMutation("https://jsonplaceholder.typicode.com/users/", "PUT");

  const onUpdate = ()=>{
    const {refFullName, refUser} = data;
    console.log(refFullName);
    console.log({name:refFullName.current.value, username:refUser.current.value, id:id});
    mutate({name:refFullName.current.value, username:refUser.current.value, id:id});
  }
  return (
    <div>
      <button onClick={onUpdate} disabled={isPending}>
        {isPending?"Actualizando...":"Actualizar"}
      </button>
      {isSuccess&&<span className='hidden-element'>Se ha actualizado correctamente</span>}
      {isError&&<span>{error.message}</span>}
    </div>
  )
}
