import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Candidatos from '../Components/Candidatos'
import Contratados from '../Components/Contratados'

export default function Rutas() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/candidatos' element={<Candidatos/>}/>
          <Route path='/contratados' element={<Contratados/>}/>
          <Route path='*' element={<Navigate to='/candidatos'/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}
