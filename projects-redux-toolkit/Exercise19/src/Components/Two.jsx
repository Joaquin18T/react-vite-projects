import { useSelector } from 'react-redux'

export default function Two() {
  const myName = useSelector(state=>state.firstSlice.nombre);
  const myArray = useSelector(state=>state.firstSlice.bibliotecas);

  return (
    <>
      <h1>{myName}</h1>
      {
        myArray.map(valor=>(
          <div key={valor.nombre}>{valor.nombre} ({valor.inicio})</div>
        ))
      }
    </>
  )
}
