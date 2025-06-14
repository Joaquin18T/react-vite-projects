import { useState,useRef } from 'react'
import Rey from './Rey';
import image1 from './images/rey_atanagildo.png'
import image2 from './images/rey_ataulfo.png'
import image3 from './images/rey_ervigio.png'
import image4 from './images/rey_leogivildo.png'
import image5 from './images/rey_recesvinto.png'
import image6 from './images/rey_sisebuto.png'
import image7 from './images/rey_teodorico.png'
import './App.css'

function App() {
  const [total, setTotal] = useState(0);
  const refRey = useRef();
  const reyes=[
    {
      nombre:"Atanagildo",
      image: image1,
      color:"darkolivegreen",
      precio:178
    },{
      nombre:"Ervigio",
      image: image3,
      color:"crimson",
      precio:169
    },{
      nombre:"Ataúlfo",
      image: image2,
      color:"peru",
      precio:81
    },{
      nombre:"Leogivildo",
      image: image4,
      color:"darkmagenta",
      precio:126
    },{
      nombre:"Recesvinto",
      image: image5,
      color:"royalblue",
      precio:141
    },{
      nombre:"Sisebuto",
      image: image6,
      color:"teal",
      precio:69
    }
  ]

  const removeRey = (e)=>{
    console.log(e);
    
    refRey.current.removeChild(e);
  }

  return (
    <div className='list'>
      <span className='pagar'>Total a pagar: {total}€</span>
      <div className="reyes" ref={refRey}>
        {
          reyes.map(({nombre, color, precio, image})=>(
            <Rey nombre={nombre} color={color} precio={precio} image={image} key={nombre} agregar={setTotal} remover={removeRey}/>
          ))
        }
      </div>
    </div>
  )
}

export default App
