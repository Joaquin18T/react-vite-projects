import { Contexto } from "./Contexto"
import { palabras } from "../Datos";
import { useEffect, useReducer, useState } from "react";
import myReducer from "./Reducer"

//const initialState = [];

export const Provider = ({children})=>{
  const [random, setRandom] = useState(Math.floor(Math.random()*palabras.length));

  const [choosePalabra, setChoose] = useState(palabras[random]);
  const [espacios, setEspacio] = useState(choosePalabra.palabro.split(""));
 
  const [letrasElegidas, setLetrasElegidas] = useState([]);
  const [fallos, setFallos] = useState(1);
  const [letrasFallos, setLetrasFallos] = useState([]);
  
  useEffect(()=>{

    setLetrasElegidas(()=>espacios.map(()=>""));
  },[]);

  const addLetra = (letra)=>{
    let posiciones = [];
    if(letrasElegidas.find(e=>e===letra)==undefined){
      posiciones = espacios.map((x,i)=>{
        if(x===letra){
          return i;
        }else{return -1}
      }).filter(y=>y!==-1);
      
      setLetrasElegidas(
        letrasElegidas.map((x,i)=>{
          if(posiciones.includes(i)){
            return letra;
          }else{
            return x;
          }
        })
      );
      console.log(letrasElegidas);
    }
    
    return posiciones;
  }

  const verificarLetra=(letra)=>{
    return espacios.indexOf(letra);
  }

  const contarFallos=()=>{
    setFallos((e)=>e+1);
  }

  const generarNumero=()=>{
    const nuevoNum = Math.floor(Math.random()*palabras.length);
    setRandom(nuevoNum);
    return nuevoNum;
  }

  const nuevaPalabra=()=>{
    const numero = generarNumero();
    const palabra = palabras[numero];
    setChoose(palabra);

    const partir = palabra.palabro.split("");
    setEspacio(partir);
    setLetrasElegidas(partir.map(()=>""));
    setFallos(1);
  }

  const validarWin=()=>{
    //let valor = false;
    const isWin = letrasElegidas.every(x=>x!=="");//letrasElegidas.every(x=>x!=="");

    return isWin;
  }

  const letrasFallidas=(letra)=>{
    let isFail = false;
    if(letrasFallos.find(x=>x===letra)==undefined){
      isFail=true;
      console.log(letrasFallos.findIndex(x=>x===letra));
      setLetrasFallos([...letrasFallos, letra]);
    }
    return isFail;
  }


  return(
    <Contexto.Provider value={{
      espacios, verificarLetra,
      addLetra,letrasElegidas,
      contarFallos, fallos,
      choosePalabra,
      validarWin,
      setEspacio, nuevaPalabra, letrasFallidas}}>
      {children}
    </Contexto.Provider>
  )
}