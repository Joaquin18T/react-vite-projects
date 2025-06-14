import React, { useState } from 'react'
import Rey from './Rey';

export default function Lista() {
  const [voto, setVotos] = useState({voto:0, nombre:""});

  const reyes = [
    {nombre:"Ervigio",vacas:3,imagen:"https://www.html6.es/img/rey_ervigio.png"},
    {nombre:"Atanagildo",vacas:6,imagen:"https://www.html6.es/img/rey_atanagildo.png"},
    {nombre:"Ataulfo",vacas:11,imagen:"https://www.html6.es/img/rey_ataulfo.png"},
    {nombre:"Leogivildo",vacas:2,imagen:"https://www.html6.es/img/rey_leogivildo.png"}
  ];

  return (
    <div className='ex2-contenedor'>
      <div className='ex2-titulo'>
        {
          voto.voto>0&&
          <>Has votado por <span>{voto.nombre}</span> con una nota de <span>{voto.voto}</span></>
        }
      </div>
      <div className='ex2-reyes'>
        <Rey nombre={reyes[0].nombre} vacas = {reyes[0].vacas} imagen = {reyes[0].imagen} setVotos={setVotos}/>
        <Rey nombre={reyes[1].nombre} vacas = {reyes[1].vacas} imagen = {reyes[1].imagen} setVotos={setVotos}/>
        <Rey nombre={reyes[2].nombre} vacas = {reyes[2].vacas} imagen = {reyes[2].imagen} setVotos={setVotos}/>
        <Rey nombre={reyes[3].nombre} vacas = {reyes[3].vacas} imagen = {reyes[3].imagen} setVotos={setVotos}/>
      </div>
    </div>
  )
}
