import {useIsFetching} from '@tanstack/react-query'
import useApi from './hooks/useApi';
import { useEffect } from 'react';

export default function Example() {
  const isFetchingUse = useIsFetching(); //Detecta todos los useQuery que estan cargando
  const isFetchingUsers = useIsFetching({queryKey:['users']}); //Detecta todos los usQuery que tenga la queryKey 'users';

  //Aca se esta renombrando la propiedad data a users para mas claridad.
  const {data:users, isLoading, isError, error, refetch} = useApi("https://reqres.in/api/users?delay=3", "users");
  const {data:testing, refetch:refetchTest} = useApi("https://reqres.in/api/users?delay=5", "testing");

  //Para que useIsFetching diferencie que hay mas de un useQuery en la App, deben de tener un queryKey diferente.

  useEffect(()=>{
    //Solo muestra 1 ya que solamente detecta los useQuery que tienen como clave users
    console.log("fetch users", isFetchingUsers); 

    console.log(isFetchingUse); //Muestra la cantidad de useQuery que estan cargando
    //Usar este hook es util cuando hay una carga secundaria o despues de la carga inicial. 
    //Asi puedes bloquear acciones hasta que se carguen todos.
  },[isFetchingUsers, isFetchingUse]);

  const onFetching = ()=>{
    refetch();
    refetchTest();
  }

  if(isLoading) return (<span>Cargando usuarios...</span>);
  if(isError) return (<span>{error.message}</span>);

  //disabled={isFetchingUse>0}: deshabilitara el elemento si hay al menos un useQuery en proceso

  return (
    <div className='containter-ex'>
      {isFetchingUse > 0 && <div>Cargando datos...</div>}
      <div className='container-list'>
        <ul>
          {
            users.data.map(({id, first_name})=>(
              <li key={id}>{first_name}</li>
            ))
          }
        </ul>
        <ul>
          {
            testing?.data.map(({id, first_name})=>(
              <li key={id}>{first_name}</li>
            ))
          }
        </ul>
      </div>
      <button onClick={onFetching} disabled={isFetchingUse>0}>Refresh</button>
    </div>
  )
}
