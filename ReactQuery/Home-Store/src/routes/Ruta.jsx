import {Route, Routes} from 'react-router-dom'
import Home from '../pages/Home'
import BarNavigate from '../Components/BarNavigate'
import InsertList from '../features/elements/InsertList'
import Products from '../features/products/Products'

export default function () {
  //El componente BarNavigate se usa como plantilla donde cada subruta
  //va a renderizar lo que contiene BarNavigate (barra de navegacion)
  return (
    <Routes>
      <Route element={<BarNavigate/>}>
        <Route path='/*' element={<Home/>}/>
        <Route path='/elements' element={<InsertList/>}/>
        <Route path='/producto' element={<Products/>}/>
      </Route>
    </Routes>
  )
}
