import { useContext } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import { Contexto } from "./Context/Contexto";

export default function Navbar() {
  const navegacion = useNavigate();
  const {deslogearse} = useContext(Contexto);
  const logOut = ()=>{
    navegacion('/login', {replace:true});
    deslogearse();
    //replace: almacena todas las rutas en las que has estado anteriormente
    //{replace: true}: Al ir al login, no guardara la ruta actual. Es decir no se podra volver

  }
  return (
    <>
      <nav>
        <NavLink to={"contenido1"}>Contenido 1</NavLink>
        <NavLink to={"contenido2"}>Contenido 2</NavLink>
        <NavLink to={"contenido3"}>Contenido 3</NavLink>
        <button onClick={logOut}>Log out</button>
      </nav>
    </>
  )
}
