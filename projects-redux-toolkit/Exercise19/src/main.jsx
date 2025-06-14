import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MyRouter from './Routes/MyRouter'
import Store from './Store/Store'
import { Provider } from 'react-redux'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <MyRouter/>
    </Provider>
  </StrictMode>,
)
