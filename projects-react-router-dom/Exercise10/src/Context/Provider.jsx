import { useReducer, useState } from "react"
import { Contexto } from "./Contexto"
import { myReducer } from "./myReducer";
import  types  from "../Components/Types";
import { myReducer2 } from "./myReducer2";

const init = ()=>{
  const valor = localStorage.getItem("estado");
  return {
    estado:!!valor
  }
}

const initialState = []
export const Provider = ({children})=>{
  const [logeado, dispatch] = useReducer(myReducer, {}, init);
  const [placeContratos, dispatch2] = useReducer(myReducer2, initialState);
  const [total, setTotal] = useState(0);

  const logearse = (name="")=>{
    localStorage.setItem("estado", name);
    dispatch({type:types.login, payload:name});
  }

  const deslogearse = ()=>{
    localStorage.removeItem("estado");
    setTotal(0);
    dispatch({type:types.logout, payload:null});
  }

  const contratarLugar=(name, precio)=>{
    dispatch2({type:types.contratar, payload:{name:name, precio:precio}});
  }

  const anularLugar = (name)=>{
    dispatch2({type:types.anular, payload:name});
  }

  return(
  <Contexto.Provider value={{...logeado, logearse, 
  deslogearse, contratarLugar, 
  total, setTotal, anularLugar,
  placeContratos, dispatch2}}>
    {children}
  </Contexto.Provider>
  )
}