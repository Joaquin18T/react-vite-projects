import { useState } from 'react'
import { Page } from './Page'
import { Colors } from './Colors'
import { Datos } from './contexts/Context'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export function App() {
  const [count, setCount] = useState(0)

  const pages=["Page 1", "Page 2", "Page 3"]

  return (
    <>    
      <Datos>
        <div className='app'>
          {
            pages.map((x)=>(
              <Page name={x}/>
            ))
          }
        </div>
        <Colors/>        
      </Datos>

    </>

  )
}

