import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../Home'
import Pseudo from '../Pseudo'

export default function Rutas2() {
  return (
    <Routes>
      <Route path='/home' element={<Home/>}/>
      <Route path='/pseudo' element={<Pseudo/>}/>
      <Route path='/' element={<Navigate to={'/home'} replace/> }/>
    </Routes>
  )
}
