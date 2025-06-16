import React, { useEffect, useState } from 'react'
import { ask, showToast } from './SweetCustom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useMutate from '../hooks/useMutate';

const fnQuery = async(params)=>{
  const resp = await fetch("http://192.168.1.38/home-store/api/product.api.php",{
    method:'PUT',
    body:JSON.stringify(params),
    headers: { "Content-Type": "application/json" }
  });
  if(!resp.ok){
    throw new Error("Hubo un error");
  }
  // const query = await resp.text();
  // console.log(query);
  return resp.json();
}

/**
 * Cambia el estado de un producto
 * @param {*} param0 Objeto con props ya definidas: (idproducto:identificacion del prod) - (
 * refresh:Refresca la tabla para que se vea el cambio de estado)-(estado:estado actual del prod)
 * @returns Un boton que cambia el estado de un producto
 */
export default function ChangeState({idproducto, refresh, estado}) {
  //const [message, setMessage] = useState("");
  //const [isShow, setIsShow] = useState(false);
  //const [estado, setEstado] = useState(0);

  //const queryClient = useQueryClient();

  //Muta el estado de un producto
  const {isPending, isSuccess, isError, error, mutate} = useMutation({
    mutationFn:fnQuery,
    onSuccess:()=>{
      showToast("Estado Actualizado del producto","SUCCESS");
      refresh();
    },
    onError:(e)=>{showToast(`Error al actualizar el estado: ${e.message}`, "ERROR")}
  });

  //Pregunta al usuario si esta seguro de cambiar el estado del producto
  const changeState =async()=>{
    if(await ask("¿Estas seguro de actualizar el estado del producto?")){
      mutate({idproducto:idproducto, estado:estado===1?0:1});
    }
  }
  
  return (
    <>
      <button onClick={changeState} className="style-btn-1-v2">Estado</button>
    </>
  )
}
