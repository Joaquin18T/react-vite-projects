import {Navigate, Route, Routes} from 'react-router-dom'
import Game from '../Game'
import Win from '../views/Win'
import Lose from '../views/Lose'

export default function Ruta() {
  return (
    <Routes>
      <Route path='game' element={<Game/>} replace/>
      <Route path='win' element={<Win/>} replace/>
      <Route path='lose' element={<Lose/>} replace/>
      <Route path='/' element={<Navigate to={'game'} replace/>}/>
    </Routes>
  )
}
