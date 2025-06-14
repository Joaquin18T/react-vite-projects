import { useContext, useEffect, useState } from "react"
import Contexto from "../Context/Contexto"

export default function ListProds() {
  const {prodElegidos, setTotal, total} = useContext(Contexto);
  const [prods, setProds] = useState();

  useEffect(()=>{
    let precioPagar = 0;
    setProds(prodElegidos.map(({nombre, precio, id})=>{
      precioPagar+=precio;
      return <li key={id}><span>{nombre}</span> <span>{precio}$</span></li>;
    }));
    setTotal(precioPagar);
  },[prodElegidos]);

  return (
    <div className="contain-boleta">
      <div className="contain-logo">
        <img src="/img/logo.webp" alt="" className="logo"/>
      </div>
      <ul>
        {prods}
      </ul>
      <div className="total-pagar">
        <span>Total a pagar: {total}$</span>
      </div>
    </div>
  )
}
