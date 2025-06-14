import { useState } from 'react'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import  Nav  from './Nav'
import Home from './Home'
import './App.css'
import Page from './Page'
import Error from './Error'

function App() {
  
  const reyes = ["atanagildo", "ataulfo", "ervigio", "leogivildo", "recesvinto", "sisebuto"];

  return (
    <BrowserRouter>
      <Nav reyes={reyes}/>
      <Routes>
        <Route path='/' element={<Home  data={reyes}/>}/>
        <Route path='/:data' element={<Page/>}/>
        <Route path='/leovigildo' element={<Navigate to={'/leogivildo'}/>}/>
        <Route path='*' element={<Error/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
