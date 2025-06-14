import {configureStore } from '@reduxjs/toolkit'
import { origenSlice, secondSlice } from './mySlice'

export default configureStore({
  reducer:{
    firstSlice:origenSlice.reducer,
    secondS:secondSlice.reducer,
  }
})