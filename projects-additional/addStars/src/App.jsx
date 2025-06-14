import { useState } from 'react'
import image1 from './images/rey_atanagildo.png'
import image2 from './images/rey_ataulfo.png'
import image3 from './images/rey_ervigio.png'
import { ImageContent } from './ImageContent'
import { OnlyComponent } from './OnlyComponent'

//import image from './michi.jpg' //cargar imagen


export function App() {
  //const [count, setCount] = useState(0);
  const data = [
    {image:image1, name:'Atanagildo'},{image:image2, name:'Ataulfo'}, 
    {image:image3, name:'Ervigio'}];

  return (
    // <div className='parentImage'>
    //   {
    //     data.map(({image, name})=>(
    //       <ImageContent url={image} name={name} key={name}/>
    //     ))
    //   }
    // </div>
    <>
      <OnlyComponent/>
    </>
  )
}
