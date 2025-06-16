import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './Login'
import Privates from './Routes/Privates'
import Public from './Routes/Public';
import Rutas2 from './Routes/Rutas2';

export default function Rutas() {
  return (
    <>
      <Routes>
        <Route path='/login' element={
        <Public>
          <Login/>
        </Public>
          }/>
        <Route path='*' element={
          <Privates>
            <Rutas2/>
          </Privates>
        }/>
      </Routes>
    </>
  )
}
