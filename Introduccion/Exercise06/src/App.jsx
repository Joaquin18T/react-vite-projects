import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useRef } from 'react';
//import './App.css'

function App() {
  const [joke, setJoke] = useState([]);
  const refRender = useRef(false);
  useEffect(()=>{

    if(!refRender.current){
      getJoke();
      refRender.current = true;
    }
    
    //console.log(repeat);
  },[]);

  const getJoke = async()=>{
    //setJoke(()=>"");
    const data = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20");
    const respuesta = await data.json();
    //console.log(respuesta);
    respuesta.results.map(x=>{
      setJoke((e)=>([...e, <p key={x.name}>{x.name}</p>]));

    });
  }

  return (
    <>
      <div>
        {joke}
        {/* <span>{joke===""?"Cargando chiste...":joke}</span> */}
        {/* <button onClick={getJoke}>Otro</button> */}
      </div>
    </>
  )
}

export default App
