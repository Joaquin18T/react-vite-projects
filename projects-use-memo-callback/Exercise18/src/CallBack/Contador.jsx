import React, { useCallback, useState } from 'react'
import { memo } from 'react';

export default function Contador() {
  const [contador, setContador] = useState(0);
  const contador3 = useCallback(()=>{
    setContador((e)=>e+3);
    console.log("renderizado 3");
  },[]);
  const contador5 = useCallback(()=>{
    setContador((e)=>e+5);

    console.log("renderizado 5");
  },[])
  const contador7 = useCallback(()=>{
    setContador((e)=>e+7);

    console.log("renderizado 7");
  },[])
  return (
    <div>
      <div>
        <Boton event={contador3} text={"+3"}/>
        <Boton event={contador5} text={"+5"}/>
        <Boton event={contador7} text={"+7"}/>

      </div>
      <span>Contador: {contador}</span>
    </div>
  )
}

const Boton=memo(({event, text})=>{
  console.log(`Renderizado: ${text}`);
  return <button onClick={event}>{text}</button>;
})
