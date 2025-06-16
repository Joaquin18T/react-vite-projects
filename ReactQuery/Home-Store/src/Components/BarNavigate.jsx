import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function BarNavigate() {
  //NavLink:Son elementos link pero modificados con la libreria React Router DOM
  //Outlet: Componente de la libreria que es reemplazado por el contenido de otras
  //vistas (El componente BarNavigate sirve como una plantilla de carga)
  return (
    <main>
      <nav>
        <NavLink to={'/producto'}><img src='/ico_storage.png'/></NavLink>
        <NavLink to={'/elements'}>Elementos</NavLink>
      </nav>
      <Outlet/>
    </main>
  )
}
