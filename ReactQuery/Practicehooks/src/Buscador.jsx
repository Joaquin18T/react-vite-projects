import React, { useEffect, useRef, useState } from 'react'
import {useInfiniteQuery, useMutation, useQuery} from '@tanstack/react-query'
import useApi from './hooks/useApi';
import useMutationApi from './hooks/useMutationApi';

const queryApi = async(pageParam)=>{
  //console.log(`http://localhost/storemagic/controllers/user.api.php?limit=5&page=${pageParam}`);
  const query = await fetch(`http://192.168.1.38/storemagic/controllers/user.api.php?limit=5&page=${pageParam}`);

  return query.json();
}

const mutateApi = async(values)=>{
  const {idcategoria, nombre} = values;
  //console.log("id", idcategoria);
  //console.log("nombre", nombre);
  const params = new URLSearchParams();
  params.append("nombre", nombre);
  params.append("idcategoria", idcategoria);

  const query = await fetch(`http://localhost/storemagic/controllers/product.api.php?${params}`);

  if(!query.ok) throw Error("Hubo un error en mutate");
  return query.json();
}

export default function Buscador() {
  //const data = [{nombre:"manzana", id:1}, {nombre:"uva", id:2}, {nombre:"pera", id:3}, {nombre:"mango", id:4}];

  const {data:dataProd, isError:isErrorProd, error:errorProd, isPending:isPendingProd, isSuccess: isSuccessProd, mutate
  } = useMutation({
    mutationFn:(params)=>mutateApi(params)
  });

  const [page, setPage] = useState(1);

  const {data, isFetching, isError, error, isLoading, refetch} = useQuery({
    queryKey:['userAPI', page],
    queryFn:()=>queryApi(page),
  });
  const [filtered, setFilteres] = useState([]);

  //Paso 2: Al momento que se escribe en el input, se va filtrando los datos que te retorna el useQuery
  //y se va actualizando el estado (filtered) sin afectar al array original.
  const filtrado = (e)=>{
    const buscado = data?.data.filter((user)=>user.nombre.includes(e.target.value));
    setFilteres(buscado);
    //console.log(buscado);
  }

  useEffect(()=>{
    //console.log(data);
    if(data?.data.length){
      //Paso 1: Cuando se monta el componente, se guarda los datos en el estado (filtered).
      //La primera carga de datos es lo que mostrara en la tabla.
      setFilteres(data.data); 
      console.log("Guardando users...");
    }
    //Nota: cuando se cambia de pagina, se le asigna nuevos datos al estado.
  },[data]);

  const onNextPage = ()=>{
    setPage(page+1);
    //refetch();
  }

  useEffect(()=>{
    if(isSuccessProd){
      console.log(dataProd);
    }
    if(isErrorProd){
      console.error(errorProd);
    }
  },[dataProd]);

  const filterProd = (e)=>{
    //console.log(e.target.value);
    //SOLAMENTE SE DEBE USAR EL USEMUTATION PARA EL FILTRADO 
    mutate({nombre:"", idcategoria:parseInt(e.target.value)});
  }

  if(isLoading) return <div>Cargando usuarios...</div>
  if(isError)return <div>Error: {error.message}</div>
  //------

  return (
    <div className='contain-table-search'>
      <div>
        Buscar: <input type="text" onChange={filtrado} className='search-input'/>
        <div>
          <select onChange={(e)=>filterProd(e)}>
            <option defaultValue={""}>Selecciona</option>
            <option value={1}>Ropa</option>
            <option value={2}>Electrodomestico</option>
            <option value={3}>Bebida</option>
            <option value={4}>Galletas</option>
            <option value={5}>Dulces</option>
            <option value={6}>Frituras</option>
          </select>
          {isPendingProd&&<div>Cargando...</div>}
          {isErrorProd&&<div>{errorProd.message}</div>}
        </div>
      </div>
      {isFetching&& <div>Cargando...</div>}
      {!isFetching&&<div>
        <table className='table-style-test'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              filtered?.map((user)=>(
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.nombre}</td>
                  <td><button onClick={()=>console.log(user.nombre)} className='button-search'>Editar</button></td>
                </tr>
              ))
            }
          </tbody>
          <tfoot>
            <tr>
              <td>
                <button onClick={()=>setPage(page-1)} disabled={page===1} className='button-search'>
                  Previous
                </button>
              </td>
              <td>
                <button onClick={onNextPage} disabled={data.currentPage===data.totalPages} className='button-search'>
                  Next
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>}
    </div>
  )
}
