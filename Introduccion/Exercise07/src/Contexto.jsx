import { createContext, useState } from "react";

export const ContextoC = createContext();

export const Datos = ({children})=>{
  const [language, setLanguage] = useState(0);
  return(
    <ContextoC.Provider value={{language, setLanguage}}>
      {children}
    </ContextoC.Provider>
  )
}