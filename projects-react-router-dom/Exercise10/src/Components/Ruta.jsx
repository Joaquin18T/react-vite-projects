import React, { useContext, useEffect, useRef, useState } from 'react'
import { Contexto } from '../Context/Contexto'
import { useNavigate } from 'react-router-dom';

export default function Ruta() {
  const {total, setTotal} = useContext(Contexto);
  const {placeContratos, anularLugar} = useContext(Contexto);
  const  {name} = useContext(Contexto);
  const refLugar = useRef();

  // useEffect(()=>{
  //   let priceTotal = 0
  //   placeContratos.map(({precio})=>{
  //     priceTotal+=precio;
  //   });
  //   setTotal(priceTotal);
  //   //console.log(placeContratos);
    
  // },[]);

  const anular = (e)=>{
    const place = e.target.parentElement.querySelector(".place-contratado").textContent;
    const pricePlace = placeContratos.find(({name})=>name===place).precio;
    anularLugar(place);
    //console.log(pricePlace);
    
    setTotal(total - pricePlace);

  }

  const navegacion = useNavigate();
  const toCapital=()=>{
    navegacion("/home");
  }
  const toNorte=()=>{
    navegacion("/no");
  }

  return (
    <div>
      <h2>Lugares a visitar</h2>
      <div>
        {
          placeContratos.length>0?
          placeContratos.map(({name, precio})=>(
            <div key={name} className={placeContratos.length>0?"list-contratos":null}>
              <button onClick={anular}>Anular</button>
              <span className='place-contratado'>{name}</span>
              <span>({precio}$)</span>
            </div>
          ))
          :
          <div>
            (Todavia no has contratado ningun lugar.
            Haz clic en <span onClick={toCapital}>Capital y Patagonia</span> o 
            <span onClick={toNorte}>Norte y Este</span> para ver ofertas).
          </div>
        }
      </div>
      <span>Total a pagar: {total}$</span>
      <span>Referencia: {name}</span>
    </div>
  )
}
