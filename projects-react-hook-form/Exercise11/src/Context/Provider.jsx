import { useReducer, useState } from "react"
import { Contexto } from "./Contexto"
import { myReducer } from "./myReducer"
import types from "./Types";

const initialState = {};

export const Provider=({children})=>{
  const [infoLugar, dispatch] = useReducer(myReducer, initialState);
  const [total, setTotal] = useState(0);

  const onSendData = (question,dato)=>{
    dispatch({type:types[question], payload:dato});
  }

  const resetData = ()=>{
    dispatch({type:types.reset});
  }

  return(
    <Contexto.Provider value={{dispatch,...infoLugar, onSendData, total, setTotal, resetData}}>
      {children}
    </Contexto.Provider>
  )
}