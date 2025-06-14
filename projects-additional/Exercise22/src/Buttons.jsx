import React from 'react'
import Button from './Generics/Button'

export default function Buttons() {
  const eventClick = (text)=>{
    console.log(text);
    
  }
  return (
    <div>
      <Button variant={'primary'} onClick={()=>{eventClick("Guardado")}} text={"Guardar"}/>
      <Button variant={'secondary'} onClick={()=>{eventClick("Cancelado")}} text={"Cancelar"}/>
    </div>
  )
}
