import React, { useContext } from 'react'
import { Contexto } from '../Context/Contexto'
import {useNavigate} from 'react-router-dom'
import { palabras } from '../Datos';

export default function Win() {
  const {nuevaPalabra} = useContext(Contexto);
  const navegacion = useNavigate();
  const reiniciar=()=>{
    nuevaPalabra();
    //reiniciarJuego();
    navegacion('/game', {replace:true});
  }
  return (
    <div>Ganaste
      <button onClick={reiniciar}>Reiniciar</button>
    </div>
  )
}
