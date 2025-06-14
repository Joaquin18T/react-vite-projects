import { useState } from 'react'
import './App.css'
import Animations from './Animations';
import useToogle from './useToogle';
import Combined from './Combined';

function App() {
  const [count, setCount] = useState(30);
  const [element, setElement] = useState();
  const {state, onChange} = useToogle();
  const aumentar = ()=>{
    setCount(count+30);
  }

  const agregar = ()=>{
    setElement(<div className='element'></div>);
  }
  return (
    <div>
      <div>
        <button onClick={()=>onChange()}>Cambiar estado</button>
        {state.toString()}
      </div>
      <div className='barra' style={{
        '--desde':`${count-30}px`,
        '--hasta':`${count}px`
      }} onClick={aumentar}>
      </div>

      <div className='exercise1'></div>
      <div className='exercise2'>
        <div className='square'></div>
        <div className='square'></div>
      </div>

      <div className='element'></div>
      <img src='/vite.svg' className='logo'/>
      <div className="rotar"></div>
      <div className="desaparecer"></div>

      {/* <Animations/> */}
      <Combined/>
    </div>
  )
}

export default App
