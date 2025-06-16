import {create} from 'zustand';
import {persist} from 'zustand/middleware'

export const useLogin = create(persist((set,get)=>({
  isLogin:false,
  user:'joaquin123',
  clave:'123456',
  onLogin:(datos)=>{
    const {user, clave} = get();
    set({isLogin:user===datos.user && clave===datos.clave?true:false});
  },
  onLogOut:()=>{set({isLogin:false})}
}),{name:'login-user'}));