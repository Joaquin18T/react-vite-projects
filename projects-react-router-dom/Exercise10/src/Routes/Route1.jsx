import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../Pages/Login'
import Route2 from './Route2'
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'

export default function Route1() {
  return (
    <Routes>
      <Route path='login' element={
      <PublicRoute>
        <Login/>
      </PublicRoute>}/>

      <Route path='/' element={
      <PublicRoute>
        <Navigate to={'login'} replace/>
      </PublicRoute>}/>

      <Route path='/*' element={
      <PrivateRoute>
        <Route2/>
      </PrivateRoute>}/>
    </Routes>
  )
}
