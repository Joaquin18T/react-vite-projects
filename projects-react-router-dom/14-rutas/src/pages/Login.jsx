import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Contexto } from "../Context/Contexto";


export default function Login(){
  const navegacion = useNavigate();
  const {logearse} = useContext(Contexto);
  const logIn=()=>{
    navegacion("/contenido1", {replace:true});
    logearse("Joaquin");
  }
  return(
    <>
      Login screen
      <button onClick={logIn}>Login</button>
    </>
  )
}