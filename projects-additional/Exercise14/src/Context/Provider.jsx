import { useState } from "react"
import Contexto from "./Contexto"


export const Provider = ({children})=>{
  const [pares, setPares] = useState(0);
  const [intentos, setIntentos] = useState(0);
  const [probabilidad, setProbabilidad] = useState(0);

  return(
    <Contexto.Provider value={{
      setPares, pares,
      setIntentos, intentos,
      probabilidad, setProbabilidad}}>
      {children}
    </Contexto.Provider>
  )
}