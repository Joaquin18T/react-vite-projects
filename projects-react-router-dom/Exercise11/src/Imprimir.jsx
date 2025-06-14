import { useContext } from "react"
import { Contexto } from "./Context/Contexto"

export default function Imprimir() {
  const {nombre, persona, habitaciones, cantPersona, dias, total} = useContext(Contexto);
  const valores = datos.find(({lugar})=>lugar===nombre);


  return (
    <div className='resumen'>
      <h2>RESUMEN:</h2>

      {!!persona?<span><strong>Cliente: </strong>{persona}</span>:""}
      <img src={valores?.imagen} alt="" />
      <span><strong>Zona: </strong> {nombre}</span>
      <span><strong>Precio: </strong> {valores?.precio}$</span>

      {!!habitaciones?<span><strong>Habitaciones: </strong>{habitaciones}</span>:""}
      {!!cantPersona?<span><strong>Personas: </strong>{cantPersona}</span>:""}
      {!!dias?<span><strong>Num Dias: </strong>{dias}</span>:""}

      <span className='total'>{!!persona?`${total}$`:""}</span>
    </div>
  )
}
