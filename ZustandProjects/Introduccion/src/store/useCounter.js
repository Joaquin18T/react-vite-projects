import {create} from 'zustand';
import {persist} from 'zustand/middleware';

export const useCounter = create((set,get)=>({
  counter:0,
  count:0,
  posts:[],
  increaseCounter:()=>{set((state)=>({counter:state.counter+1}))},
  getPosts:async()=>{
    const res=await(await fetch("https://jsonplaceholder.typicode.com/posts")).json(); //manera resumida
    set(state=>({...state, posts:res}))
  },
  clearStore:()=>set({}, true),//sirve para limpiar el store (se borra todos los props y actions)
  multiply:(value)=>{
    const {counter} = get();
    set({counter:counter*value})
  },
}));

//Este store persiste en el localStorage, no se reinicia el valor cuando se recarga la vista
export const countStore = create(
  persist(
    (set)=>({
      count:0,
      increment:()=>set(state=>({count:state.count+1}))
    }),
    {name:'count-storage'}
  )
);
//counter:inicializa el store
//useConter: hook personalizado que Zustand lo genera para ti, donde permite acceder al estado global y las acciones
//set:Funcion que Zustand usa para actualizar el estado global
//state: estado actual(counter)
//state.counter: acceder al estado global

