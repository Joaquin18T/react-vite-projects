import React from 'react'
import useToogle from './useToogle'

export default function Animations() {
  const  {state,setValor, onChange} = useToogle("A", "B");
  return (  
    <div className='animations'>
      <div>
        <button onClick={()=>setValor("C")}>Asignar nuevo valor</button>
        <button onClick={()=>onChange()}>Cambiar estado</button>
        <button onClick={()=>setValor("A")}>Cambiar A forzado</button>
        <button onClick={()=>setValor("B")}>Cambiar B forzado</button>
        {state.toString()}
      </div>
      <div className="rotating-circle">v</div>
      <div className="color-changing-box"></div>
      <div className="blinking-text">¡Parpadeo!</div>
      <div className="zigzag-box"></div>
      <div className="bouncing-box"></div>
    </div>
  )
}
