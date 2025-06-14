import { useContext, useEffect, useState } from 'react'
import { palabras } from './Datos';
import Letter from './Letter'
import { Contexto } from './Context/Contexto'
import Ahorcado from './Ahorcado';

export default function Game() {
  const {espacios, letrasElegidas, choosePalabra} = useContext(Contexto);
  
  return (
    <div className='content'>
      <div className='content-palabra'>
        <span>{choosePalabra.pregunta}</span>
        <div className='palabras-elegidas'>
          {
            letrasElegidas.map((x,i)=>(
              <span key={i}>{x}</span>
            ))
          }
        </div>
        <div className='space'>
          {espacios.map((x,i)=>(
            <span key={i} className='span-espacio'></span>
            ))
          }
        </div>
      </div>
      <Letter/>
      <Ahorcado/>
    </div>
  )
}
