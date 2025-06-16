import React from 'react'
import { useLogin } from './store/useLogin'
import { useShallow } from 'zustand/shallow'
import styled from 'styled-components';

const Square =styled.div`
  border:2px solid ${props=>props.$valor?"red":"green"};
  height:20px;
  width:20px;
  margin:3px;
`;

//Extendiendo estilos de 'Square' o heredando estilos
const ModernSquare = styled(Square)`
  border-radius:3px;
  background-color:#fff;
  border:2px solid #DD4F65
`;

const Circle = styled.div`
  border-radius:100%;
`;

const Button = styled(ModernSquare)`
  width:150px;
  color:#222;
  text-align:center;
  height:30px;
  cursor:pointer;
`;

//La propiedad 'as' en un styled component puede cambiar el tipo de elemento de un componente (de un div a un link, etc.)
//sin perde los estilos definidos. Tambien se puede cambiar a otro styled component con 'as'. 
//Esto sirve para evitar duplicar styled components, cambiar la semantica del elemento manteniendo los estilos y para 
//reutilizar estilos en otros elementos diferentes.

//Cambiando un div por un link: <ModernSquare className='animate-spin' as={"a"} href='#'/>
//Cambiando el styled component de 'Square': <Square className='animate-bounce shadow-xl shadow-white' as={Circle}/>
//Cambiando el contenido:<UpButton>Boton moderno</UpButton>. Aca UpButton es un nuevo componente a partir de una funcion
//donde cambia su texto a mayuscula

export default function Home() {

  const {onLogOut} = useLogin(useShallow(state=>({
    onLogOut:state.onLogOut
  })));

  const logearse = ()=>{
    onLogOut();
    //navigate('/login');
  }

  const UpButton = (props)=>{
    return <Button {...props} children={props.children.toUpperCase()}/>
  }

  return (
    <div>
      Home
      <button onClick={logearse}>Log out</button>
      <div className='flex m-4 border-1 p-1 border-white max-w-90 shadow-xl shadow-cyan-500/50'>
        <Square className='animate-bounce' />
        <ModernSquare className='animate-spin' as={"a"} href='#'/>
        <Square className='animate-bounce shadow-xl shadow-white' as={Circle}/>
        <UpButton onClick={()=>{console.log("click")}}>Boton moderno</UpButton>
      </div>
    </div>
  )
}
