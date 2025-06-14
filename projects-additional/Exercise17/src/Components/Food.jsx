import { useContext, useEffect } from "react"
import { datos } from "./Datos"
import Contexto from "../Context/Contexto"

export default function Food() {
  const {addFood, rateados} = useContext(Contexto);

  const addRate = (producto, id)=>{
    const food = datos.find((x)=>x.id===id);
    food.estado=true;
    addFood(producto, id);
  }

  useEffect(()=>{
    //console.log(rateados);
    
  },[rateados]);
  return (
    <div className="contain-foods">
      {
        datos.filter(({estado})=>!estado).map(({producto, id})=>(
          <div key={id} className="food" onClick={()=>addRate(producto, id)}>{producto}</div>
        ))
      }
    </div>
  )
}
