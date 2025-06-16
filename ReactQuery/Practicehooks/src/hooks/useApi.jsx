import { useQuery } from '@tanstack/react-query'
import React from 'react'

const apiList = async(url)=>{
  //console.log(url);
  const fetching = await fetch(url);
  const data = await fetching.json();
  console.log(data);
  if(!fetching.ok){
    throw new Error("Error en la peticion");
  }
  return data;
}

export default function useApi(url, pg=0, op={}) {
  const query = useQuery({
    queryKey: ['userQuery',pg],
    queryFn:()=>apiList(url),
    ...op
  }); 
  return (query);
}
