import { useCounter } from './store/useCounter';
import { countStore } from './store/useCounter';
import { useShallow } from 'zustand/shallow';
import './App.css'
import { useEffect } from 'react';


function App() {
  //comparacion atomatica: compara propiedades especificas de un objeto
  //En Zustand se compara las props especificas dentro del objeto en el estado global:
  //const count = useCounter(state => state.counter); Solamente se renderiza cuando counter cambia de valor

  //Aca solamente se renderiza cuando count o increase cambian de valor, pero no por otros cambios en el store
  const {count, posts} = useCounter(
    useShallow((state) => ({count:state.counter, posts:state.posts}))
  );
  const {increase, getPosts, multiply, clear} = useCounter(
    useShallow(state=>({
      increase:state.increaseCounter, 
      getPosts:state.getPosts,
      multiply:state.multiply,
      clear:state.clearStore,
    }))
  );
  const {countP,increment} = countStore(
    useShallow(state=>({countP:state.count, increment:state.increment}))
  )
  //useShallow es la mejor forma de evitar renderizaciones innecesarias ahora
  //shallow funcionaba para versiones anteriores
  //El cambio se debe a que useShallow esta mejor optimizado para integrarlo con React

  //NOTA:Separar las propiedades que son funciones con las props que solamente leen
  
  useEffect(()=>{
    getPosts();
  },[]);
  return (
    <>
      <h2>{count}</h2>
      <h2>Cantidad persistente:{countP}</h2>
      <button onClick={increase}>+</button>
      <button onClick={increment}>+ persistente</button>
      <button onClick={()=>multiply(2)}>Multiplicar</button>
      <button onClick={clear}>Clear</button>
      <hr/>
      {
        posts?.map(({id,title, body})=>(
          <div key={id}>
           <span>{title}</span><br/>
          </div>
        ))
      }
    </>
  )
}

export default App
