import { NavLink } from "react-router-dom";
function Active({isActive}){
  //isActive es una propiedad de Navlink para saber si el enlace esta activado
  return isActive?"activado":null
}

export function Nav(){
  return(
    <nav>
      <NavLink className={Active} to="/" title="Page 1">Page 1</NavLink>
      <NavLink className={Active} to="/page2" title="Page 2">Page 2</NavLink>
      <NavLink className={Active} to="/page4/buenas" title="Page 3">Page 3</NavLink>
      <NavLink className={Active} to="/page4/hi" title="Page 4">Page 4</NavLink>

    </nav>
  )
}