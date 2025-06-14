import React, { useEffect, useState } from 'react'

export default function useToogle(x=false, y=true) {
  const [state, setState] = useState(x);

  const setValor = (valor)=>{
    setState(valor);
  }
  const onChange=()=>{
    setState(state===x?y:x);
  }

  return (
    {state, onChange, setValor}
  )
}
