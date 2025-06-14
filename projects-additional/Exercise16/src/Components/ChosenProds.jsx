import { useContext } from "react"
import Contexto from "../Context/Contexto"

export default function ChosenProds({dataProd, outDataProd}) {
  const {prodElegidos, devolverProducto, cambiarEstado} = useContext(Contexto);

  const devolver = (id)=>{
    devolverProducto(id);
    cambiarEstado(id);
    outDataProd();
  }
  return (
    <div className="elegidos">
      {
        prodElegidos.map(({imagen, nombre, id})=>(
          <img src={`/img/${imagen.toLowerCase()}`} alt="" key={nombre} className="prod-elegidos"
          onMouseOver={()=>dataProd(id)}
          onMouseOut={()=>outDataProd()}
          onClick={()=>devolver(id)}/>
        ))
      }
    </div>
  )
}
