import {Route, Routes} from 'react-router-dom';
import CreateUser from '../Components/CreateUser';
import UpdateUser from '../UpdateUser';
import Buscador from '../Buscador';

export default function Rutas() {
  return (
    <>
      <Routes>
        <Route path='/' element={<CreateUser/>}/>
        <Route path='update-user' element={<UpdateUser/>}/>
        <Route path='search' element={<Buscador/>}/>
      </Routes>
    </>
  )
}
