import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Recuperate from '../pages/Recuperate'
import Router2 from './Router2'
import PublicRoute from '../PublicRoute'
import PrivateRoute from '../PrivateRoute'

export default function Router1() {
  return (
    <Routes>
      <Route path='login' element={
      <PublicRoute>
        <Login/>
      </PublicRoute>}/>

      <Route path='recuperacion' element={
      <PublicRoute>
        <Recuperate/>
      </PublicRoute>}/>

      <Route path='/*' element={
      <PrivateRoute>
        <Router2/>
      </PrivateRoute>}/>
    </Routes>
  )
}
