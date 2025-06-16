import React, { useEffect, useRef, useState } from 'react'
import {useQueryClient, useMutation} from '@tanstack/react-query'
import useApiMutation from './hooks/useApiMutation';
import UpdateMutation from './UpdateMutation';
import DeleteMutation from './DeleteMutation';
import Users from './Users';
import {v4 as uuidv4} from 'uuid'
//POST

export default function Explication() {
  const [dataUpdate, setDataUpdate] = useState({});
  const [isDelete, setIsDelete] = useState(false);
  const refUser = useRef();
  const refFullName = useRef();
  const {isPending, isSuccess, isError, mutate, error, data} = useApiMutation("https://jsonplaceholder.typicode.com/users");
  //mutation.mutate -> sirve para ejecutar la peticion de la funcion ApiRegisterUsers(POST). 

  const sendData = ()=>{
    mutate({name:refFullName.current.value, username: refUser.current.value, id:11});
    refUser.current.value = "";
    refFullName.current.value = "";
  }

  useEffect(()=>{
    //console.log("state update", dataUpdate);
    refFullName.current.value = !dataUpdate.name?"":dataUpdate.name;
    refUser.current.value = !dataUpdate.username?"":dataUpdate.username;
  }, [dataUpdate]);

  //data={{refFullName, refUser}}: Se crea un objeto implicitamente, las claves son el nombre de las variables (refFullName, refUser).
  //Y su valor es lo que almacena

  useEffect(()=>{
    if(isDelete){
      setTimeout(()=>{
        setIsDelete(!isDelete);
      },2000);
    }
  }, [isDelete]);

  return (
    <div>
      <form>
        <div>
          <label htmlFor="nombre">Nombre completo: </label>
          <input type="text" id='nombre' ref={refFullName}/>
        </div>
        <div>
          <label htmlFor="user">Nombres de usuario: </label>
          <input type="text" id="user" ref={refUser}/>
        </div>
        <button type='button'
          onClick={sendData}
          disabled={isPending}>
            {isPending?"Creando...":"Crear usuario"}
        </button>
      </form>
      {isSuccess&&<div className='hidden-element'>La mutacion fue exitosa</div>}
      {isError&&<div>{error.message}</div>}
      <br/>
      <UpdateMutation data={{refFullName, refUser}} id={dataUpdate.id}/>
      {/* <DeleteMutation/> */}
      <br/>
      <Users setDataUpdate={setDataUpdate} setIsDelete={setIsDelete}/>
      {isDelete&&<span className='hidden-element'>Usuario eliminado</span>}
    </div>
  )
}
