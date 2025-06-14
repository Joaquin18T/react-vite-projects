import React from 'react'
import Card from './Generics/Card'
import Button from './Generics/Button'

export default function ListCards() {
  return (
    <div>
      <Card title={"Mi primer Card"}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam in ipsam deleniti quo quia debitis.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam in ipsam deleniti quo quia debitis.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam in ipsam deleniti quo quia debitis.
        <Button variant={"danger"} text={"Aceptar"} onClick={()=>{console.log("Aceptado")}}/>
      </Card>
      <Card title={"Mi segundo Card"}>
        <img src="/vite.svg" alt="" />
      </Card>
    </div>
  )
}
