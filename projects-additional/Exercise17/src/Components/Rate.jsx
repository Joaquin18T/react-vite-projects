import { useContext, useEffect, useState } from "react"
import Contexto from "../Context/Contexto"

export default function Rate() {
  const {rateados, addStar, reiniciarStar} = useContext(Contexto);
  const [stars, setStars] = useState(rateados);
  
  const renderStars = (num)=>{

    const image = "/estrella.png";
    let temp =[];
    for (let i = 0; i < num; i++) {
      temp=[...temp, image];
    }
    return temp;
  }

  const onStart = (id)=>{
    reiniciarStar();
    addStar(id);
  }

  useEffect(()=>{
    
    let ordernados = [...rateados];
    //Usando el metodo sort:
    //ordernados.sort((a,b)=>a-b);
    //si a-b<0 entonces no se cambia de posicion
    //si a-b>0 entoncea b cambia de posicion con a
    //si a-b==0 entonces no cambia
    //-----------

    for (let i = 0; i < ordernados.length; i++) {
      for(let j = ordernados.length-1; j>i; j--){
        if(ordernados[j].star>ordernados[i].star){
          [ordernados[i], ordernados[j]]=[ordernados[j], ordernados[i]]; //Algoritmo de Fisher Yates
        }
      }
      
    }
    setStars(ordernados);
  },[rateados]);


  return (
    <div className="contain-rates">
      {
        stars.map(({nombre, id, star})=>(
          <div key={id} className="rate" onClick={()=>onStart(id)}>
            <span>{nombre}</span>
            <div className="contain-stars" >
              {
                renderStars(star).map((x,i)=>(
                  <img src={x} alt="" key={i} className="star"/>
                ))
              }
            </div>
          </div>
        ))
      }
    </div>
  )
}
