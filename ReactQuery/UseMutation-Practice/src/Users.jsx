import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import DeleteMutation from './DeleteMutation';

const queryApi = async()=>{
  const query = await fetch("https://jsonplaceholder.typicode.com/users");
  
  if(!query.ok) throw new Error("Hubo un error en la solicitud");

  return query.json();
}

export default function Users({setDataUpdate, setIsDelete}) {
  const {data, isFetching, refetch, isLoading} = useQuery({
    queryKey:["users"],
    queryFn:queryApi
  });
  useEffect(()=>{
    console.log(data);
    //setDataUsers([...users, ...data]);
  },[data]);

  const onUpdate = (id_user)=>{
    const person = data.find(({id})=>id===id_user);
    setDataUpdate({name:person.name, username:person.username, id:person.id});
    //console.log({name:person.name, username:person.username});
  }

  return (
    <ul>
      {
        !isFetching&&
        data?.map(({name, id},i)=>(
          <li key={i}>
            {name}
            <button onClick={()=>onUpdate(id)}>Update</button>
            <DeleteMutation id={id} setDelete={setIsDelete}/>
          </li>
        ))
      }
    </ul>
  )
}
