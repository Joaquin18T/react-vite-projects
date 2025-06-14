import { useState } from 'react'
import Route1 from './Routes/Route1'
import { Provider } from './Context/Provider'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Provider>
      <Route1/>
    </Provider>
    </>

  )
}

export default App
