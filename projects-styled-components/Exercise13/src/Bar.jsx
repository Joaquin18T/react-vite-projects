import { useEffect, useState } from 'react';
import {Title, ContainBar, Square, BarColor, Line} from './StylePractica';
import { valores } from './Datos';

const colors = ["#a29bfe", "#74b9ff", "#81ecec","#fab1a0","#ffeaa7","#6c5ce7","#00cec9", "#00b894"];
export default function Bar() {
  const [color, setColor] = useState();
  const [datos, setDatos] = useState(valores);

  useEffect(()=>{
    const numero = Math.floor(Math.random()*colors.length);
    setColor(colors[numero]);
    console.log(datos);
    
  },[datos]);

  const aumentar = (color)=>{
    setDatos(datos.map(x=>{
      if(x.color===color && x.altura<170){
        return{...x, altura:x.altura+40, desde:x.altura}
      }else{
        return x;
      }
    }));
  }

  return (
    <>
      <ContainBar>
        <Title $micolor={color}>Tus Ganancias:</Title>
        <Square>
          <Line/>
          {
            datos.map((elemento,i)=>(
              <BarColor $colorbar={elemento.color} 
              $heightbar={elemento.altura} key={i} onClick={()=>aumentar(elemento.color)} $desde={elemento.desde} $test/>
            ))
          }
        </Square>
      </ContainBar>
    </>
  )
}
