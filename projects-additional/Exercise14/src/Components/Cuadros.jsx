import { useContext, useEffect, useRef, useState } from 'react'
import cuadros from './Datos'
import Contexto from '../Context/Contexto';

export default function Cuadros() {
  const [cartas, setCartas] = useState([]);
  const refRender = useRef(false);

  const [par, setPar] = useState([]);
  const {setPares, pares, setIntentos, intentos,
    probabilidad, setProbabilidad
  } = useContext(Contexto);
  const refModal = useRef();
  const refOverlay = useRef();

  const baraja = ()=>{
    const temporal = Array(6).fill("");

    let copy = [...temporal];
    let num = 0;

    for (let i = 0; i < temporal.length; i++) {
      num = Math.floor(Math.random()*cuadros.length);
      let filtrado = copy.includes(cuadros[num]);

      while(filtrado){
        num = Math.floor(Math.random()*cuadros.length);
        filtrado = copy.includes(cuadros[num]);
      }
      copy[i] = cuadros[num];      
      //NO USAR DOS NUMEROS RANDOMS EN UNA MISMA LOGICA

    }
    
    return copy;
    
  }

  const fisherYates =()=>{
    const copy = [...cuadros];

    for (let i = cuadros.length-1; i >0; i--) {
      const random = Math.floor(Math.random()*i);
      [copy[i], copy[random]]=[copy[random], copy[i]];
      
    }
    return copy;
  }

  useEffect(()=>{
    if(!refRender.current){
      let temp = [];
      for (let i = 0; i < 2; i++) {
        temp = [...temp,...fisherYates()];
        
      }
      //console.log(temp);
      setCartas(temp);
      refRender.current=true;
    }

  },[]);

  const cerrarModal=()=>{
    refModal.current.classList.add("hidden");
    refOverlay.current.classList.add("hidden");
  }

  const modal = <>
  <section className="modal hidden" ref={refModal}>
    <span className='texto-modal'>HAS GANADO</span>
    <button onClick={cerrarModal}>Cerrar</button>
  </section>
  <div className="overlay hidden" ref={refOverlay}></div>
  </>


  const elegido = (e,carta)=>{
    if(e.target.src ==="https://www.html6.es/img/rey_.png"){
      e.target.src = carta;
      setPar([...par, e.target]);
    }
  
  }

  useEffect(()=>{
    if(par.length===2){
      if(par.every(x=>x.src!=="https://www.html6.es/img/rey_.png")){
        setIntentos(e=>e+1);
      }
      if(par[0].src===par[1].src){
        console.log("es par");
        setPares(e=>e+1);
      }else{
        console.log("no par");
        setTimeout(()=>{
          par.map(x=>{
            x.src = "https://www.html6.es/img/rey_.png";
          });
        },1000);
      }
      setPar([]);
      //setProbabilidad(pares>0?Math.round((pares*100)/intentos):0);
    }
    if(pares===6){
      refModal.current.classList.remove("hidden");
      refOverlay.current.classList.remove("hidden");
    }
  },[par]);

  return (
    <div className='baraja'>
      {
        cartas.map((x,i)=>(
          <div key={i} className='carta'>
            <img src="https://www.html6.es/img/rey_.png" className='rey' onClick={(e)=>elegido(e,x)}/>
          </div>
        ))
      }
      <div>
        <span>{pares} aciertos de {intentos} intentos ({pares>0?Math.round((pares*100)/intentos):0}%)</span>
      </div>
      <>
        {
          pares===6?modal:null
        }
      </>
    </div>
  )
}
