import { useReducer } from "react"
import { Contexto } from "./Contexto"
import { myReducer } from "./myReducer";
import { types } from "./Types";

const init = ()=>{
  const valor = localStorage.getItem("estado");
  return{
    estado:!!valor 
  }
}

export const Provider = ({children})=>{
  const [logeado, dispatch] = useReducer(myReducer, {}, init);
  const logearse = (user="")=>{
    localStorage.setItem("estado", true);
    dispatch({type:types.login});
  }

  const deslogearse = ()=>{
    localStorage.removeItem("estado");
    dispatch({type:types.logout});
  }
  //logeado esta siendo copiado en el value para que se pueda usar correctamente (usar directo sus propieades)
  return(
    <Contexto.Provider value={{...logeado, logearse, deslogearse}}>
      {children}
    </Contexto.Provider>
  )
}