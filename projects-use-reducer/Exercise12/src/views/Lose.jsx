import React, { useContext } from 'react'
import { Contexto } from '../Context/Contexto'
import {useNavigate} from 'react-router-dom'

export default function Lose() {
  const {nuevaPalabra, choosePalabra} = useContext(Contexto);
  const navegacion = useNavigate();

  const reiniciar=()=>{
    nuevaPalabra();
    navegacion('/game', {replace:true});
  }
  return (
    <div className='contain-lose'>
      <div>Vaya, respuesta incorrecta</div>
      <div>La respuesta es: <strong>{choosePalabra.palabro}</strong></div>
      <img src="/el_ahorcado6.png" alt="" className='ahorcado'/>
      <button onClick={reiniciar} className='btn-reiniciar'>Jugar de nuevo</button>
    </div>
  )
}
