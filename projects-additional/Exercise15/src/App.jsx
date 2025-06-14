import { useState } from 'react'
import Exercise01 from './Exercise01'
import './App.css'
import Lista from './Exercise02/Lista'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Exercise01/> */}
      <Lista/>
    </>
  )
}

export default App
