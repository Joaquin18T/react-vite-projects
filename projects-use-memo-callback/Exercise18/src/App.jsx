import { useState } from 'react'
import NumPrimos from './Memo/NumPrimos'
import Ordenar from './Memo/Ordenar'
import Contador from './CallBack/Contador'
import Test from './Test'

//import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <button onClick={()=>setCount(count+1)}>Contar {count}</button> */}
      {/* <NumPrimos/> */}
      {/* <Ordenar/> */}

      {/* <Contador/> */}
      <Test/>
    </>
  )
}

export default App
