import React, { useContext } from 'react'
import { Contexto } from '../Context/Contexto'
import { Navigate } from 'react-router-dom';

export default function PublicRoute({children}) {
  const {estado} = useContext(Contexto);
  return (!estado)
  ?children
  :<Navigate to={"/home"}/>
}
