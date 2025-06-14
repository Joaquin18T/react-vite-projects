import { useState } from 'react'
import Rey from './Rey'
import Actividad2 from './Actividad2'
import Actividad3 from './Actividad3'
import Actividad4 from './Actividad4'
import './App.css'

function App() {
  const reyes=[
    {
        nombre:"Atanagildo",
        reinado:15,
        vacasComidas:9
    },{
        nombre:"Ervigio",
        reinado:7,
        vacasComidas:3
    },{
        nombre:"Ataúlfo",
        reinado:5,
        vacasComidas:16
    },{
        nombre:"Leovigildo",
        reinado:18,
        vacasComidas:3
    },{
        nombre:"Sisebuto",
        reinado:9,
        vacasComidas:13
    },{
        nombre:"Recesvinto",
        reinado:19,
        vacasComidas:11
    },{
        nombre:"Teodorico",
        reinado:33,
        vacasComidas:12
    }
  ]

  return (
    <div>
      {/* <div className='container'>
        <h2>Actividad 1:</h2>
        <div className="reyes">
          {
            reyes.map(({nombre, reinado, vacasComidas})=>(
              <Rey nombre={nombre} reinado={reinado} vacasComidas={vacasComidas} key={nombre}/>
            ))
          }
        </div>
      </div> */}

      {/* <Actividad2 data={reyes}/> */}

      {/* <Actividad3 data={reyes}/> */}

      <Actividad4 data={reyes}/>
    </div>
  )
}

export default App
