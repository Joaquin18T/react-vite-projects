import { useState } from 'react'
import { Provider } from './Context/Provider'

import Cuadros from './Components/Cuadros'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Provider>
        <Cuadros/>
      </Provider>
    </>
  )
}

export default App
