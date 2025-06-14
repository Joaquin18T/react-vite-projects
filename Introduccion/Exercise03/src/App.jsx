import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import CambioCoin from './CambioCoin'
import './App.css'

function App() {
  const [cont, setCont] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const reyesGodos=[
    {
      nombre: "Ataúlfo",
      aficion: "comer toros sin pelar",
    },{
      nombre: "Recesvinto",
      aficion: "leer a Hegel en arameo",
    },{
      nombre: "Teodorico",
      aficion: "la cría del escarabajo en almíbar"
    }
  ]

  const nextRey = ()=>{
    if(cont===reyesGodos.length-1){
      setCont(0);
    }else{
      setCont(cont+1);
    }

    setMensaje(      <p>
      La aficion principal de <span className='rey'>{reyesGodos[cont].nombre} </span>
      es <span className='accion'>{reyesGodos[cont].aficion}</span>
    </p>);
  }

  return (
    // <div>
    //   <button onClick={nextRey}>Ver Siguiente</button>
    //   {mensaje}
    // </div>
    <>
      <CambioCoin/>
    </>
  )
}

export default App
