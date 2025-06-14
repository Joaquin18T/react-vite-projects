import { useReducer } from 'react'
import Contexto from './Contexto'
import types from './Types';
import { myReducer } from './myReducer';

const initialState = [];

export const Provider = ({children})=>{
  const [rateados, dispatch] = useReducer(myReducer, initialState);

  const addFood = (nombre, id)=>{
    dispatch({type:types.agregar, payload:{nombre:nombre, id:id}});
  }

  const addStar = (id)=>{
    dispatch({type: types.ratear, payload:id});
  }

  const reiniciarStar = ()=>{
    dispatch({type:types.reset});
  }

  return(
    <Contexto.Provider value={{addFood, rateados, addStar, reiniciarStar}}>
      {children}
    </Contexto.Provider>
  )
}