import React, { useContext, useEffect, useState } from 'react'
import { Contexto } from './Context/Contexto'
import { datos } from './Data';

const Resumen = ({isPrinter})=>{
  //const {valor} = props;
  const {nombre, persona, habitaciones, cantPersona, dias} = useContext(Contexto);
  const valores = datos.find(({lugar})=>lugar===nombre);
  const {total, setTotal} = useContext(Contexto);

  useEffect(()=>{
    setTotal(valores?.precio);
    let aumento = valores?.precio;
    if(!!habitaciones){
      aumento *=Number(habitaciones);
    }
    if(!!cantPersona){
      aumento *=Number(cantPersona);
    }
    if(!!dias){
      aumento *=Number(dias);
    }
    setTotal(aumento);
    //console.log(total);
    
  },[habitaciones, cantPersona, dias]);
  return (
    <div className='resumen'>
      <h2>RESUMEN:</h2>
      {isPrinter?<span><strong>Cliente: </strong>{persona}</span>:""}
      <img src={valores?.imagen} alt="" />
      <span><strong>Zona: </strong> {nombre}</span>
      <span><strong>Precio: </strong> {valores?.precio}$</span>

      <>
        {
          !isPrinter?
            !!persona?<span><strong>Cliente: </strong>{persona}</span>:""
          :""}
      </>
      {!!habitaciones?<span><strong>Habitaciones: </strong>{habitaciones}</span>:""}
      {!!cantPersona?<span><strong>Personas: </strong>{cantPersona}</span>:""}
      {!!dias?<span><strong>Num Dias: </strong>{dias}</span>:""}

      <span className='total'>{!!persona?`${total}$`:""}</span>
    </div>
  )
};
export default Resumen