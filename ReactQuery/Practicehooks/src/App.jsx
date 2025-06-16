import { useState } from 'react'
import CreateUser from './Components/CreateUser'

import './App.css'
import Rutas from './Routes/Rutas'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Rutas/>
    </>
  )
}

export default App
