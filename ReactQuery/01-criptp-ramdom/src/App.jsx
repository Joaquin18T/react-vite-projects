import { useEffect, useReducer, useRef, useState } from 'react'
import './App.css'
import useRandom from './hooks/useRandom'


function App() {
  const query = useRandom();
  return (
    <>
      <div className='contain-numero-aleatorio'>
        {
          query.isFetching
            ?(<h2>Cargando...</h2>)
            : (<h2>Numero Aleatorio: {query.data}</h2>)
        }

        {
          !query.isLoading && query.isError && (<h3>{`${query.error}`}</h3>)
        }

        <button onClick={()=>query.refetch} disabled={query.isFetching}>
          {
            query.isFetching?'...':"Nuevo Numero"
          }
        </button>
      </div>
    </>
  )
}

export default App
