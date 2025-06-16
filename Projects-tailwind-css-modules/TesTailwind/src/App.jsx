import { useState } from 'react'
import './App.css'
import Button from './Button'
import Card from './Card'
import Rutas from './Rutas'

function App() {
  //div principal: flex-gap-5
  {/* <Button size={'md'} textBtn={'Mediano'}/>
  <Button size={'sm'} textBtn={'Pequenio'}/> */}
  {/* <Card variant={'primary'} title={'Carta Primaria'} content={`
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur, cupiditate. Odit est nemo magni eos.
    `} onAction={()=>{console.log("carta primaria")}}/>
  <Card variant={'secondary'} title={'Carta '} content={`
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur, cupiditate. Odit est nemo magni eos.
    `} onAction={()=>{console.log("carta Secundaria")}}/>
  <Card variant={'danger'} title={'Carta Danger'} content={`
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur, cupiditate. Odit est nemo magni eos.
    `} onAction={()=>{console.log("carta danger")}}/> */}
  return (
    <div >
      <Rutas/>
    </div>
  )
}

export default App
