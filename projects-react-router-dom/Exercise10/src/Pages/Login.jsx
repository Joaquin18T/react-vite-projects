import React, { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Contexto } from '../Context/Contexto';

export default function Login() {
  const refUser = useRef();

  const navegacion = useNavigate();
  const {logearse} = useContext(Contexto);
  const login=()=>{
    navegacion("/home", {replace:true});
    logearse(refUser.current.value);
  }
  return (
    <div className='contain-login'>
      <h2>Vive el pais:</h2>
      <div>
        <label htmlFor='usuario'>Referencia: </label>
        <input type="text" id='usuario' ref={refUser}/>
        <button onClick={login}>Login</button>
      </div>
    </div>
  )
}
