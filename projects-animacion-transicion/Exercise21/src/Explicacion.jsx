import { useState,useRef } from 'react'

export default function Explicacion() {
  const valores = [
    {color:"red", alto:77},
    {color:"olive", alto:177},
    {color:"orange", alto:105}
  ];
  const [altura, setAltura] = useState(20);
  const refElemento = useRef(null);

  const aumentar = ()=>{
    setAltura(altura+(Math.floor(Math.random()*70)+20));
    //el maximo es 69
    //si es 0, como minimo es 20

    //refElemento.current.classList.toggle("parar");
    //toggle: permite agregar o eliminar el nombre de la clase

    //--altura
  }

  const final = ()=>{
    altura>190 && setAltura(0);
  }

  return (
    <>
      <div className="container">
        <div className="barra rojo" style={{
            height:`${altura}px`,
            transition:'height 2s ease-in-out'
          }} 
          onTransitionEnd={final}
          onClick={aumentar}>
            {altura}
        </div>
      </div>
    </>
  )
}
