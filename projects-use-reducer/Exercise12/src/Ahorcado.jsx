import React, { useContext } from 'react'
import { Contexto } from './Context/Contexto'

export default function Ahorcado() {
  const {fallos} = useContext(Contexto);
  return (
    <div>
      <img src={`/el_ahorcado${fallos}.png`} alt="" className='ahorcado'/>
    </div>
  )
}
