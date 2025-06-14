import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Rutas from './Routes/Rutas'
import './App.css'
import { Provider } from 'react-redux'
import Store from './Store/Store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <Rutas/>
    </Provider>
  </StrictMode>,
)
