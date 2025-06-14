import { useContext, useEffect, useRef, useState } from 'react'
import marta from '../images/marta.png'
import aime from '../images/aimee.png'
import grace from '../images/grace.png'
import Persona from './Persona'

import { ContextoC } from '../Contexto'

export default function Info({valores}) {
  const [dato, setDato] = useState(0);

  const {language} = useContext(ContextoC);
  
  const [render, setRender] = useState(null);
  const listImages = [marta, aime, grace];
  const dataImg = listImages.find(x=>x.includes(valores[language].foto));

  useEffect(()=>{
    if(dato==1){
    
      setRender(
        <>
          <h1>{valores[language].boton1}</h1>
          <img src={dataImg}/>
          <h2>{valores[language].nombre}</h2>
        </>
      )
    }
    else if(dato==2){
      setRender(
        <>
          <h1>{valores[language].boton2}</h1>
          <span>{valores[language].direccion}</span>
        </>
      )
    }
  },[dato, language]);

  const showImg=()=>{
    setDato(1);
  }
  const showAddress=()=>{
    setDato(2);
  }
  return (
    <div>
      <div>
        <h2>{valores[language].titulo}</h2>
        <h3>{valores[language].texto}</h3>
      </div>
      <div>
        <button onClick={showImg}>{valores[language].boton1}</button>
        <button onClick={showAddress}>{valores[language].boton2}</button>
      </div>
      <div>
        {render}
      </div>
    </div>
  )
}
