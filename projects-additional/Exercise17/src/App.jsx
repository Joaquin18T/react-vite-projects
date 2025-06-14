import { useState } from 'react'

import './App.css'
import Food from './Components/Food'
import Rate from './Components/Rate'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='contain'>
        <Food/>
      </div>
      <Rate/>
    </>
  )
}

export default App
