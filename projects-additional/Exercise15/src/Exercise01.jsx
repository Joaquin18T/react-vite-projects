import React, { useState } from 'react'
import react from './assets/react.svg'

export default function Exercise01() {
  const elementos =[1, 2, 3];
  const [color, setColor] = useState("green");
  const [contenido, setContenido] = useState();

  const action = (valor)=>{
    const imagen = <img className='ex1-imagen' src={react}/>;
    let showData;
    switch(valor){
      case 1:
        showData = <div>HOLA JAB</div>;
        break;
      case 2:
      case 3:
        showData = imagen;
        if(valor===3){
          setColor(color==="green"?"red":"green");
        }
        break;
    }

    setContenido(showData);
  }

  return (
    <div className='ex1-contenedor'>
      <div className='ex1-botones'>
        {
          elementos.map(x=>(
            <button key={x} onClick={()=>action(x)} className='ex1-boton'>Boton {x}</button>
          ))
        }
      </div>
      <div className='ex1-contenido' style={{backgroundColor:color}}>
        {contenido}
      </div>
    </div>
  )
}
