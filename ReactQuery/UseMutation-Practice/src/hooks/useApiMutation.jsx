import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'

const fetchApi = async(params, url, action)=>{
  //console.log("url", url);
  const query = await fetch(`${url}`, {
    method:"POST",
    body:JSON.stringify(params), //JSON -> String
    headers:{ "Content-Type": "application/json" }
  });

  //Si no se lanza un error explicito, la mutacion (funcion que hace la solicitud) siempre se considerara exitosa incluso
  //si la api devuelve un error en la respuesta
  if(!query.ok)throw new Error ("Hubo un error en la respuesta");

  return query.json();
}
export default function useApiMutation(url, method="POST") {
  const [cont, setCont] = useState(11);
  const queryClient = useQueryClient(); //se obtiene el objeto de useQueryClient para poder interactuar con el cache
  //Permite agregar, actualizar y eliminar datos de la cache cuando sea necesario
  //El hook sirve para modificar datos
  const mutation = useMutation({
    mutationFn:(params)=>fetchApi(params, url, method), //propiedad que ejecuta la mutacion
    onSuccess:(data)=>{ //Ejecuta onSuccess cuando la respuesta de la api (fetchApi) es exitosa
      if(method==="POST"){
        const copy = {...data,id:cont};
        data = {...copy};
        console.log("datos mutados", data);
        setCont(cont+1);
        //queryClient.invalidateQueries(['users']); //actualiza los datos de la consulta con la clave users (Hace una nueva consulta)
        // refresca la lista de usuarios con queryClient.invalidateQueries(['users']) sin recargar la pagina;
        //Si hay useQuery(['users']) en otro componente lo actualizara automaticamente.
      }

      //setQueryData actualiza manualmente los datos almacenados en caché para la clave ["users"].
      //Si otro componente usa useQuery(['users']) se actualizara automaticamente sin necesidad de hacer otra solicitud
      queryClient.setQueryData(["users"], (oldData) => {
        if(oldData && method==="PUT"){
          //const updated = oldData.find(({id})=>id===data.id);
          const nuevo = oldData.map((user)=>{
            if(user.id===data.id){
              return {...data};
            }else{
              return user;
            }
          });
          oldData = [...nuevo];
          console.log("put action", oldData);
        }
        //OldData representa los datos antes de la actulizacion
        if (!oldData) return [data]; //Si no hay datos anteriores, entonces retorna el array con el nuevo dato registrado
      
        if(method==="PUT") return oldData;
        return [...oldData, data]; //Si hay datos previos, entonces se va a poner los datos antiguos y el nuevo dato en un solo array
      });
      

      //Si no quieres actualizar la lista de datos, entonces no se agrega la propiedad onSuccess
    }
  });
  return (mutation);
}
