import { useEffect } from "react";
import { useLogin } from "./store/useLogin";
import {useShallow} from 'zustand/shallow';
import styled from 'styled-components';

const Square =styled.div`
border:2px solid ${props=>props.$valor?"red":"green"};
height:20px;
width:20px;
`;
export default function Login() {
  const {onLogin, isLogin} = useLogin(useShallow(state=>({
    onLogin:state.onLogin,
    isLogin:state.isLogin
  })));

  const onSend = (e)=>{
    e.preventDefault();
    onLogin({user:e.target[0].value,clave:e.target[1].value});
  };
  
  useEffect(()=>{
    console.log(isLogin);
  },[isLogin]);

  return (
    <div className="border-2 rounded-md border-red-400 max-w-100 flex items-center">
      <form action="" onSubmit={onSend}>
        <div>
          <label>Usuario: </label>
          <input className='style-input'/>
        </div>
        <div>
          <label>Clave: </label>
          <input type="password" className='style-input'/>
        </div>
        <button type="submit">Enviar</button>
      </form>
      <Square className="bg-gray-500" $valor={true}/>
      <Square className="bg-gray-500"/>
    </div>
  )
}
