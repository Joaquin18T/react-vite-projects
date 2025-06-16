import React from 'react'
import {useIsFetching} from '@tanstack/react-query'
import useApi from './hooks/useApi'

export default function Exe1() {
  const isFetchingUse = useIsFetching(); 

  const {data:users, isLoading, refetch, isError} = useApi("https://reqres.in/api/users?delay=3","users");
  const {data:products, isLoading:isLoadProd, refetch:prodRef, isError:IserrorProd} = useApi("https://jsonplaceholder.typicode.com/albums?&_limit=5","prods");


  return (
    <div>
      {isFetchingUse>0&&<span>Cargando...</span>}
      <button onClick={()=>refetch()} disabled={ isFetchingUse>0 }>Refresh Users</button>
      <button onClick={()=>prodRef()} disabled={ isFetchingUse>0 }>Refresh Products</button>
      <div>
        <ul>
          {isLoading?<span>Cargando usuarios...</span>:isError?<span>Hubo un error al cargar usuarios</span>:(
            users?.data.map(({id, first_name})=>(
              <li key={id}>{first_name}</li>
            )))
          }
        </ul>
      </div>
      <div>
        <ul>
          {isLoadProd?<span>Cargando productos...</span>:IserrorProd?<span>Hubo un error en productos</span>:
            products?.map(({id, title})=>(
              <li key={id}>{title}</li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}
