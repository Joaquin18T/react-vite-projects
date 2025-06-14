import { useContext } from "react"
import { CreateC } from "./contexts/Context"

export function Page({name}){
  const {color}=useContext(CreateC); //usando el contexto
  return(
    <div className="children" style={{backgroundColor:color}}>
      {name}
      <h3>{color}</h3>
    </div>
  )
}