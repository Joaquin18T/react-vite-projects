import { useRef } from 'react';
import './estiloChild.css';

export default function Rey({nombre, color, precio, image, agregar, remover}) {
  const refRey = useRef();

  const agregarRey=(x)=>{
    agregar((e)=>precio+e);

    remover(refRey.current);
  }
  return (
    <div style={{backgroundColor:color}} className='rey' ref={refRey} id={nombre}>
      <span className='nombreRey'>{nombre}</span>
      <img src={image} alt="" />
      <div className='dataRey'>
        <span>Precio:</span>
        <span>{precio}€</span>
        <button onClick={agregarRey}>Comprar</button>
      </div>
    </div>
  )
}
