import { useContext,useState,useEffect } from "react"
import marta from '../images/marta.png'
import aime from '../images/aimee.png'
import grace from '../images/grace.png'
import { ContextoC } from "../Contexto"

export default function Persona({dato, valores}) {
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

  return (
    <div>
      {render}
      {
        // dato===1?
        //   <>
        //     <h1>{valores[language].boton1}</h1>
        //     <img src={dataImg}/>
        //     <h2>{valores[language].nombre}</h2>
        //   </>
        // :dato===2?
        //   <>
        //     <h1>{valores[language].boton2}</h1>
        //     <span>{valores[language].direccion}</span>
        //   </>
        // :""
      }
    </div>
  )
}
