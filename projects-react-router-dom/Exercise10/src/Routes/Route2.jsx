import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../Components/Home'
import Navbar from '../Components/Navbar'
import Norte from '../Components/Norte'
import Ruta from '../Components/Ruta'
import InfoPlace from '../Components/InfoPlace'

export default function Route2() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='home' element={<Home/>}/>
        <Route path='no' element={<Norte/>}/>
        <Route path='ruta' element={<Ruta/>}/>
        <Route path='info/:data' element={<InfoPlace/>}/>
        <Route path='/' element={<Navigate to={'home'} replace/>}/>
      </Routes>
    </>
  )
}
