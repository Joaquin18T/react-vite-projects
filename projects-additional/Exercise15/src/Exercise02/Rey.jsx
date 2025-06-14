import React, { useEffect, useState } from 'react'

export default function Rey({nombre, vacas, imagen, setVotos}) {
  const [votarRey, setVotarRey] = useState(0);

  const aumentarVoto = ()=>{
    setVotarRey((e)=>e+1);
    
  }
  useEffect(()=>{
    setVotos({voto:votarRey, nombre:nombre});
  },[votarRey]);
  return (
    <div className='ex2-rey'>
      <div className='ex2-nombre-rey'>{nombre}</div>
      <div>Come {vacas} vacas al dia</div>
      <img src={imagen} alt="" className='ex2-imagen'/>
      <div className='ex2-votos'>
        <button onClick={aumentarVoto} className='ex2-boton'>Votar</button>
        <span className='ex2-voto-rey'>{votarRey}</span>
      </div>
    </div>
  )
}
