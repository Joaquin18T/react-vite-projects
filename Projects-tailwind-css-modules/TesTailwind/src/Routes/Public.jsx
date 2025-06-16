import React from 'react'
import { useLogin } from '../store/useLogin'
import { useShallow } from 'zustand/shallow'
import { Navigate } from 'react-router-dom';

export default function Public({children}) {
  const {isLogin} = useLogin(useShallow(state=>({
    isLogin:state.isLogin
  })));
  return (!isLogin)?
  children
  :<Navigate to={'/home'}/>
}
