import { useState } from 'react'
import Router1 from './router/Router1'
import './App.css'
import { Provider } from './Context/Provider'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Provider>
        <Router1/>
      </Provider>
    </>
  )
}


