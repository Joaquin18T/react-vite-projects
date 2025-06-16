import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Explication from './Explication'
import SecondMutation from './secondMutation'
import SecondQuery from './secondQuery'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Explication/> */}
      {/* <SecondMutation/> */}
      <SecondQuery/>
    </>
  )
}

export default App
