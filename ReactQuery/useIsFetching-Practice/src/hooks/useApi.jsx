import { useQuery } from '@tanstack/react-query'
import React from 'react'

const apiList = async(url)=>{
  const fetching = await fetch(url);
  const data = await fetching.json();
  if(!fetching.ok){
    throw new Error("Error en la peticion");
  }
  return data;
}

export default function useApi(url, keyName, pg=0, op={}) {
  const query = useQuery({
    queryKey: [keyName,pg],
    queryFn:()=>apiList(url),
    ...op
  }); 
  return (query);
}
