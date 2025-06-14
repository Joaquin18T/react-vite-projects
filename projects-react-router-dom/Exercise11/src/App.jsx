import { useState } from 'react'

import './App.css'
import Ruta from './Routes/Ruta'
import { Provider } from './Context/Provider'

function App() {

  return (
    <>
      <Provider>
        <Ruta/>
      </Provider>
    </>
  )
}

export default App
