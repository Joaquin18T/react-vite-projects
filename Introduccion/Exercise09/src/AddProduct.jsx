import { useRef,useReducer } from "react";
import Product from "./Product";

const types={
  add:"add",
  moreU:"moreU",
  lessU:"lessU",
  deleteProd:"deleteProd"
}

const initialState = [];

const reducer = (state, action)=>{
  switch(action.type){
    case types.add:
      state = [...state,{name:action.payload, cantidad:1}];
      break;
    case types.moreU:
      let updateAmount = state.map((x)=>{
        if(x.name===action.payload){
          return {...x, cantidad:x.cantidad+1};
        }else{
          return {...x};
        }
      });
      state = [...updateAmount];
      break;
    case types.lessU:
      let lessAmount = state.map((x)=>{
        if(x.name===action.payload && x.cantidad>1){
          return {...x, cantidad:x.cantidad-1};
        }else{
          return {...x};
        }
      }); 
      state = [...lessAmount];
      break;
    case types.deleteProd:
      let filtrar = state.filter(({name})=>name!==action.payload);
      state = [...filtrar];
      break;
  }
  //console.log(state);
  
  return state;
}

export default function AddProduct() {
  const [producto, dispatch] = useReducer(reducer, initialState);
  const refProducto = useRef();

  const agregar = ()=>{
    dispatch({type:types.add, payload:refProducto.current.value});
    refProducto.current.value="";
    refProducto.current.focus();
  }
  const actionProd=(name, action)=>{
    dispatch({type:action, payload:name});
  }
  return (
    <>
      <div>
        <label htmlFor="campo">Producto: </label>
        <input type="text" id="campo" ref={refProducto}/>
        <button onClick={agregar}>Agregar</button>
      </div>
      <div>
        {
          producto.map(({name, cantidad})=>(
            <Product key={name} name={name} cantidad={cantidad} actionProd={actionProd} types={types}/>
          ))
        }
      </div>
    </>
  )
}
