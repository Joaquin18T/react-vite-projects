import { useState } from 'react'
import AddProduct from './AddProduct'
//import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AddProduct/>
    </>
  )
}

export default App
