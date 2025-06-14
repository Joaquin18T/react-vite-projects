import React from 'react'
import data from './Data'
import Place from './Place';

export default function Home() {
  const places = data.filter(({zona})=>zona==="cp");
  //console.log(places);
  
  return (
    <div className="list-capital">
      {
        places.map(({nombre, imagen, situacion, servicio, precio})=>(
          <Place 
          nombre={nombre} 
          imagen={imagen} 
          situacion={situacion} 
          servicio={servicio}
          precio={precio}
          key={nombre}/>
        ))
      }
    </div>
  )
}
