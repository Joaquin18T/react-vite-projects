import { useReducer, useState } from "react"
import { myReducer } from "./myReducer";
import Contexto from './Contexto';
import types from './Types';
import PRODUCTOS from '../Data/Datos';

const initialState = [];
export const Provider = ({children})=>{
  const [prodElegidos, dispatch] = useReducer(myReducer,initialState);
  const [presupuesto, setPresupuesto] = useState(30);
  const [productos, setProductos] = useState(PRODUCTOS);
  const [total, setTotal] = useState(0);

  const addProducto = (data)=>{
    dispatch({type:types.add, payload:data});
  }

  const devolverProducto = (id)=>{
    dispatch({type:types.devolver, payload:id});
    const {precio} = buscarProducto(id);

    setPresupuesto((e)=>e+precio);
  }

  const cambiarEstado = (id)=>{
    setProductos(productos.map(x=>{
      if(x.id===id){
        return{...x, disponible:true};
      }else{
        return x;
      }
    }));
  }

  const buscarProducto = (idprod)=>{
    return productos.find(({id})=>id===idprod);
  }
  return(
    <Contexto.Provider value={{
      addProducto, prodElegidos, 
      presupuesto, setPresupuesto,
      devolverProducto, cambiarEstado,
      productos, setProductos,
      buscarProducto,
      total, setTotal}}>
      {children}
    </Contexto.Provider>
  )
}