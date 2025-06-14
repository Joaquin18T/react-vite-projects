import {useDispatch, useSelector} from 'react-redux'
import { incrementar, modificarValor, saveNombre, agregarValor, eliminarValor } from '../Store/mySlice';
export default function One() {
  //enviara los datos para modificar el estado del primer Slice 
  const dispatch = useDispatch(); 
  const myName = useSelector(state=>state.firstSlice.nombre);
  const myPuntuacion = useSelector(state=>state.secondS.puntuacion);

  const modificar = ()=>{
    dispatch(saveNombre('Chisato'))
  }

  const incrementarPuntuacion = ()=>{
    dispatch(incrementar());
  }

  const modificarArray=()=>{
    dispatch(modificarValor({
      indice:0,
      nuevoNombre:"React",
      nuevoInicio:"Mayo del 2013"
    }));
  }

  const agregar = ()=>{
    dispatch(agregarValor({
      nuevoNombre:"Vue",
      nuevoInicio:2014
    }));
  }

  const eliminar = ()=>{
    dispatch(eliminarValor("Vue"));
  }

  return (
    <>
      <h1>{myName}</h1>
      <h1>{myPuntuacion}</h1>
      <button onClick={modificar}>Modificar el nombre</button>
      <button onClick={incrementarPuntuacion}>Incrementar</button>
      <button onClick={modificarArray}>Modificar un valor</button>
      <button onClick={agregar}>Agregar valor</button>
      <button onClick={eliminar}>Eliminar valor</button>
    </>
  )
}
