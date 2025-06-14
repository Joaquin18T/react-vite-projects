import {configureStore} from '@reduxjs/toolkit'
import { firstSlice, secondSlice } from './Slices'

export default configureStore({
  reducer:{
    oneSlice: firstSlice.reducer,
    sldCandidatos: secondSlice.reducer
  }
})