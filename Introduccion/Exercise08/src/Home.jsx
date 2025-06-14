import image1 from './images/rey_atanagildo.png'
import image2 from './images/rey_ataulfo.png'
import image3 from './images/rey_ervigio.png'
import image4 from './images/rey_leogivildo.png'
import image5 from './images/rey_recesvinto.png'
import image6 from './images/rey_sisebuto.png'

import {Link} from 'react-router-dom'
export default function Home({data}) {
  const reyes = [image1, image2, image3, image4, image5, image6];
  const imagenes = reyes.map((x,i)=>{
    const url = `/${data[i]}`;
    return <Link to={url} key={x}><img src={x} alt=""/></Link> 
  });

  return (
    <div className='contain-imagenes'>
      {imagenes}
    </div>
  )
}
