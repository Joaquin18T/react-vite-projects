import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react'

const fetchApiCountries = async(country)=>{
  const queryFetch = await fetch(`https://restcountries.com/v3.1/name/${country}`);
  if(!queryFetch.ok){
    throw new Error(`Hubo un error al obtener la bandera ${country}`);
  }
  return queryFetch.json();
}

export default function FlagCountry({country}) {
  const {data, isFetching, isError, error} = useQuery({
    queryKey:['flag', country],
    queryFn:()=>fetchApiCountries(country),
    enabled:!!country
  });
  
  useEffect(()=>{
    console.log(data);
  }, [data]);

  if(isFetching)return <span>Cargando imagen...</span>
  if(isError)return <span>{error.message}</span>
  if(!data || data.length===0)return <span>No hay bandera de {country}</span>
  return (
    <>
      <img src={data[0]?.flags.svg}/>
    </>
  );
}
