import { Navigate, Route,Routes, useNavigate } from 'react-router-dom';
import { useLogin } from '../store/useLogin';
import { useShallow } from 'zustand/shallow';

export default function Privates({children}) {
  const {isLogin} = useLogin(useShallow(state=>({
    isLogin:state.isLogin
  })));

  return(isLogin)?
  children:
  <Navigate to={'/login'}/>
}
