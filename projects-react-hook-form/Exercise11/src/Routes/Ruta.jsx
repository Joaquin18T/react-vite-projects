import {Routes, Route, Navigate} from 'react-router-dom'
import Question from '../Question'
import Place from '../Place'

export default function Ruta() {
  return (
    <>
      <Routes>
        <Route path='preguntas' element={<Question/>}/>
        <Route path='/form' element={<Place/>}/>
        <Route path='/' element={<Navigate to={"/form"}/>}/>
      </Routes>
    </>
  )
}
