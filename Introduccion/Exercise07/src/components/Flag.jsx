import spain from '../images/spain.jpg'
import france from '../images/francia.png'
import uk from '../images/uk.png'
import { useContext, useEffect, useRef, useState } from 'react'
import { ContextoC } from '../Contexto'

export default function Flag() {
  const [imagenes, setImagenes] = useState([]);
  const images = [spain, france, uk];
  const refRender = useRef(false);
  const {setLanguage} = useContext(ContextoC);

  useEffect(()=>{
    if(!refRender.current){
      images.map((x,i)=>(
        setImagenes((e)=>[...e,<img src={x} key={x} onClick={()=>{setLanguage(i)}}></img>])
      ));
    }
    refRender.current = true;
  },[]);

  const chooseLanguage=()=>{

  }
  return (
    <div className='flags'>
      {imagenes}
    </div>
  )
}
