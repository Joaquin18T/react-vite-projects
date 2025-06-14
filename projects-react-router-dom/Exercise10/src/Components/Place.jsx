import React, { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Contexto } from '../Context/Contexto';


export default function Place({nombre, situacion, imagen}) {  
  const navegacion = useNavigate();
  const showInfo=()=>{
    navegacion(`/info/${nombre}`);
  }
  const {placeContratos} = useContext(Contexto);
  
  const existeLugar = placeContratos.some(({name})=>name===nombre);
  const ruta = `/images/${imagen}`
  if(!existeLugar){
    <Navigate to={"/no"}/>
  }
  return (
    <div className='place'>
      <div className='name-place'>{nombre}</div>
      <div className='situacion'>{situacion}</div>
      <img src={ruta} alt="" />
      <div className='info-place'>
        <button onClick={showInfo}>Mas info</button>
        <div className={existeLugar?"contratado":null}></div>
      </div>
    </div>
  )
}
