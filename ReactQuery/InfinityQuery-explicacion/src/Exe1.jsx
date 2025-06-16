import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import React, { useEffect, useState } from "react";
import useApiInfinityQuery from "./hooks/useApiInfinityQuery";
import ButtonFetch from "./Components/ButtonFetch";
import FlagCountry from "./Components/FlagCountry";

const parseData = (data)=>data.results; //metodo de parseo (la respuesta de la api se encuentra en results)

export default function Exe1() {
  // const {data, isFetchingNextPage, fetchNextPage, hasNextPage} = useInfiniteQuery({
  //   queryKey:['users'],
  //   queryFn:fetchQueries,
  //   getNextPageParam:(lastPage,pages)=>{
  //     return lastPage.length?pages.length+1:undefined;
  //   }
  // });

  const {data, isFetchingNextPage, fetchNextPage, hasNextPage, isFetching, isLoading} = useApiInfinityQuery("https://randomuser.me/api/", 
  {first:"page",second:"results"}, parseData,"",{refetchOnWindowFocus: false}); //pasamos como argumento el metodo de parseo

  useEffect(()=>{
    console.log(data);
  },[data]);

  //Primer map, itera sobre las pagina cargada
  //Segundo map, itera sobre los registros de cada pagina cargada(Siempre debe recorrer el objeto page.map .
  //Si hay otro objeto mas ahi, no se va a poder mostrar la siguiente pagina)
  
  {/* <button onClick={()=>fetchNextPage()} disabled={isFetchingNextPage||!hasNextPage}>
    {isFetchingNextPage?"Cargando...":"Mostrar mas"}
  </button> */}

  if(isLoading) return (<div>Cargando datos...</div>)
  return (
    <div>
      <ButtonFetch fetchNextPage={fetchNextPage} isFetchNextPage={isFetchingNextPage} hasNextPage={hasNextPage}>
        {isFetchingNextPage?"Cargando...":"Mostrar mas"}
      </ButtonFetch>
      <ul>
      {
        data?.pages.map((page,i)=>(
          <React.Fragment key={i}>
            {page.map(({name, location, login})=>(
              <li key={login.uuid}>
                <span>{name.first} {name.last} - {location.country}</span>
                <FlagCountry country={location.country}/>
              </li>
            ))}
          </React.Fragment>
        ))
      }
      </ul>
      <div>{isFetching&& "Cargando mas datos..."}</div>
    </div>
  )
}
