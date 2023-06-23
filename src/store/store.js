import { configureStore } from '@reduxjs/toolkit'
import toastReducer from './toastSlice'
import authReducer from './authSlice'
import viewReducer from './viewSlice'

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    auth: authReducer,
    view: viewReducer
  },
})

