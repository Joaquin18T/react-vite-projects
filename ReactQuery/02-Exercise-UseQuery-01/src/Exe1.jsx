import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import useApi from './hook/useApi';


export default function Exe1() {
  //En la ultima version de tansackQuery, a useQuery como argumento se le pasa un objeto, especificando las props.
  const {data, isLoading, isError, error, refetch, isFetching} = useApi("https://jsonplaceholder.typicode.com/posts");
  //error: es un objeto, para mostrar el mensaje de error, se accede a la propiedad 'message'

  useEffect(()=>{
    if(data)console.log(data);
  },[data]);

  if(isFetching) return (<h1>Cargando...</h1>); //si isFetching es true mostrara el h1
  if(isError) return (<h1>{error.message}</h1>); //si isError es true mostrara el mensaje de error
  if(!data||data.length===0) return (<h1>No hay publicaciones para mostrar</h1>); //si no hay datos mostrara un mensaje

  return (
    <>
      <div>
        <button onClick={()=>refetch()} disabled={isFetching}>
          {isFetching?'...':"Click"}
        </button>
      </div>
      <ul>
        {!isFetching &&(
          data.map(({id, title, body})=>(
            <li key={id}>
              <span><strong>{title}: </strong></span>
              <span>{body}.</span>
            </li>
          ))
        )}
      </ul>
    </>
  )
}
