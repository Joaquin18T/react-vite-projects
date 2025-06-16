import {useQueries} from '@tanstack/react-query'
import { apiList } from './hooks/useApi';
import { useEffect } from 'react';


export default function Example() {
  //Hace varias consultas en paralelo si quieres evitar usar varios useQuery
  const results = useQueries({
    queries:[
      {queryKey:['users'], queryFn:()=>apiList("https://reqres.in/api/users"), placeholderData:(prev)=>prev||[]},
      {queryKey:['prods'], queryFn:()=>apiList("https://fakestoreapi.com/products?limit=5"), placeholderData:(prev)=>prev||[]}
    ],
    
  });

  //Cada consulta mantiene su estado de manera independiente
  const queryUsers = results[0]; //datos de la primera consulta
  const queProducts = results[1]; //datos de la segunda consulta

  useEffect(()=>{
    console.log(results);
  },[results]);

  const isFetchingUsers = queryUsers.isFetching;
  const isErrorUsers = queryUsers.isError;
  const isFetchingProducts = queProducts.isFetching;
  const isErrorProducts = queProducts.isError;


  return (
    <div>
      <div>
        <button onClick={()=>queryUsers.refetch()} disabled={isFetchingUsers}>Refetch Users</button>
        <ul>
          {isFetchingUsers && (<div>Cargando usuarios...</div>)}
          {isErrorUsers &&(<div>Error al cargar usuarios: {queryUsers.error.message}</div>)}
          {!isFetchingUsers && !isErrorUsers &&
            (
              queryUsers.data?.data.map(({id, first_name})=>(
                <li key={id}>{first_name}</li>
              ))
            )
          }
        </ul>
      </div>
      <div>
        <button onClick={()=>queProducts.refetch()} disabled={isFetchingProducts}>Refetch Products</button>
        <ul>
          {isFetchingProducts &&(<div>Cargando productos...</div>)}
          {isErrorProducts && (<div>Error al cargar productos: {queProducts.error.message}</div>)}
          {!isFetchingProducts && !isErrorProducts&&(
            queProducts?.data.map(({id, title})=>(
              <li key={id}>{title}</li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}
