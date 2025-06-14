import { useContext, useEffect } from "react";
import { letras } from "./Datos"
import { Contexto } from "./Context/Contexto";
import {useNavigate} from "react-router-dom"

export default function Letter() {
  const {verificarLetra, addLetra, letrasElegidas, 
    contarFallos, fallos, validarWin, letrasFallidas} = useContext(Contexto);
  const navegacion = useNavigate();

  const validar = (e)=>{
    const isOkey = verificarLetra(e.target.textContent);
    if(isOkey>=0){
      e.target.style.backgroundColor = "green";
      const pos=addLetra(e.target.textContent);
      console.log("pos", pos);
      
    }else{
      e.target.style.backgroundColor = "red";
      const isFail = letrasFallidas(e.target.textContent);
      if(isFail){
        contarFallos();
      }
    }

    if(fallos===6){
      navegacion("/lose");
    }

    //e.target.disabled=true;
  }

  useEffect(()=>{
    console.log("letras elegidas",letrasElegidas);


    const isWin = validarWin();
    if(isWin && letrasElegidas.length>0){
      navegacion("/win");
    }
  },[letrasElegidas]);
  return (
    <div className="letras">
      {
        letras.map(letra=>(
          <button className="letra" key={letra} onClick={validar}>
            {letra}
          </button>
        ))
      }
    </div>
  )
}
