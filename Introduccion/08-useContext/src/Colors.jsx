import { useContext } from "react"
import { CreateC } from "./contexts/Context"

export function Colors(){
  const {setColor}=useContext(CreateC); //modificando el color del contexto
  const colors=[
    {
      value:"#ff4757"
    },
    {
      value:"#eccc68"
    },
    {
      value:"#7bed9f"
    },
    {
      value:"#a4b0be"
    },
  ]
  return (
    <div className="colors">
      {
        colors.map(({value})=>(
          <div className="color" onClick={()=>{setColor(value)}}></div>
        ))
      }
    </div>
  )
}