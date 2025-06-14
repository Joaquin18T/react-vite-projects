import { useContext, useRef, useState } from 'react'
import Products from './Components/Products'
import PRODUCTOS from './Data/Datos';
import './App.css'
import ChosenProds from './Components/ChosenProds';
import Contexto from './Context/Contexto';
import ListProds from './Components/ListProds';

function App() {
  const refProductOver = useRef();
  const {presupuesto, buscarProducto} = useContext(Contexto);

  const dataProd = (idprod)=>{
    const {nombre, precio} = buscarProducto(idprod);
    refProductOver.current.insertAdjacentText("afterbegin", `${nombre} (${precio}$)`);
  }

  const outDataProd=()=>{
    refProductOver.current.textContent="";
  }

  return (
    <>
      <div className="contenedor">
        <div className="productos">
          <Products dataProd={dataProd} outDataProd={outDataProd}/>
        </div>
      </div>
      <div>
        Presupuesto: <span>{presupuesto}$</span> <span ref={refProductOver}></span>
      </div>
      <ChosenProds dataProd={dataProd} outDataProd={outDataProd}/>
      <>
        <ListProds/>
      </>
    </>
  )
}

export default App
