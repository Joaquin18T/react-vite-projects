import { useState } from 'react'
import './App.css'
import { Page1 } from './pages/Page1'
import { Page2 } from './pages/Page2'
import { Page3 } from './pages/Page3'
import { Page4 } from './pages/PageParams'
import { Error } from './pages/Error'
import { Nav } from './Nav'
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Nav/>
      <Routes>
        <Route path='/' element={<Page1/>}/>
        <Route path='/page2' element={<Page2/>}/>
        <Route path='/page4' element={<Page3/>}/>
        <Route path='/page4/:word' element={<Page4/>}/>
        {/*Navigate esta redireccionando a la pagina1*/}
        <Route path='/page1' element={<Navigate to='/'/>}/>
        <Route path='*' element={<Error/>}/>
      </Routes>
    </BrowserRouter>
  )
}


