import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './AppOld.jsx'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient(); 
// instancia global de reactQuery
// Maneja el almacenamiento en cache de las solicitudes HTTP
// se usa para configurar opciones en las solicitudes HTTP

//QueryClientProvider
// Envuelve toda la aplicacion para que pueda usar las herramientas de React Query

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
