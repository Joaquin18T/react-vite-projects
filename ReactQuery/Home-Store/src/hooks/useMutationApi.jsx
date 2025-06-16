import {useMutation, useQueryClient} from '@tanstack/react-query'
import { useState } from 'react';

//Metodo para solicitudes POST, PUT
const queryApi = async(url, params, action)=>{
  console.log(params);
  const query = await fetch(url,{
    method:action,
    body:JSON.stringify(params)
  });
  if(!query.ok) throw new Error("Hubo un error en la respuesta");

  // const data = await query.text();
  // console.log(data);
  return query.json();
}

//Metodo para solicitudes GET
const queryAlternative = async (url,data, urlParams)=>{
  const params = new URLSearchParams();
  //optimizar los parametros segun urlParams
  params.append(urlParams.param1, data.first);
  params.append(urlParams.param2, data.second);
  params.append(urlParams.param3, data.third);
  params.append(urlParams.param4, data.fourth);
  params.append(urlParams.param5, data.five);

  const query = await fetch(`${url}?${params}`);
  if(!query.ok) throw new Error("Hubo un error en la respuesta");
  const resp = await query.json();
  console.log(resp);
  
  return resp;
}
//url:direccion url de la API
//action:Metodo HTTP
//keyQuery:identificacion de la consulta
//typeQuery:Tipo de consulta (Registrar = 1, Mostrar = 2)
//urlParams:nombre de los parametros cuando se necesitan mostrar datos con algun parametro
export default function useMutationApi(url,action="POST", keyQuery="", typeQuery=1, urlParams={}) {
  const queryClient = useQueryClient();
  //console.log("cuerpo", urlParams);
  let mutatee = {};
  if(typeQuery===1){
    const mutation = useMutation({
      mutationFn:(params)=>queryApi(url,params, action),
      onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:[keyQuery]});
      },
      
    });
    mutatee = {...mutation};
  }else if(typeQuery===2){
    const mutation = useMutation({
      mutationFn:(params)=>queryAlternative(url,params, urlParams),
      onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:[keyQuery]});
      }
    });
    mutatee = {...mutation};
  }

  return (mutatee);
}
