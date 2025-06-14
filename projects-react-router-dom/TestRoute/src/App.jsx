import { useState } from 'react'
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom'
import { Home, Layout, NoMatch, User, Users } from './Views'

function App() {
  const navegacion = useNavigate();
  const [users, setUsers]= useState([
    { id: '1', fullName: 'Robin Wieruch' },
    { id: '2', fullName: 'Sarah Finnley' },
  ]);
  const removeUser = (iduser)=>{
    setUsers(users.filter(({id})=>id!==iduser));
    navegacion('/users');
  }
  return (
    <>
      <Routes>
        <Route element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='users' element={<Users users={users}/>}>
            <Route path=':iduser' element={<User onRemoveUser={removeUser}/>}/>
            {/* {Estado en la vista users, al hacer click en uno de sus links(mirar en Vista>Users)
            se pasa directamente el parametro (id), la nueva ruta es: users/(id del usuario)
            Es una ruta secundaria de la ruta principal users y una ruta anidada
            (ruta secundaria = ruta anidada)} */}
          </Route>
          <Route path='*' element={<NoMatch/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
