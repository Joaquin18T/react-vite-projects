import React,{useContext} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Contexto } from '../Context/Contexto';

export default function () {
  const navegacion = useNavigate();
  const {deslogearse} = useContext(Contexto);

  const logout = ()=>{  
    navegacion("/login", {replace:true});
    deslogearse();
  }

  const active=({isActive})=>{
    return isActive?"select":null
  }
  return (
    <>
      <nav>
        <div className='list-link'>
          <NavLink to={"/home"} className={active}>Capital y Patagonia</NavLink>
          <NavLink to={"/no"} className={active}>Norte y Este</NavLink>
          <NavLink to={"/ruta"} className={active}>Ruta</NavLink>
        </div>
        <div>
          <button onClick={logout}>Logout</button>
        </div>
      </nav>
    </>
  )
}
