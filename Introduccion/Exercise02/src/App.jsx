import { useRef, useState } from 'react'
import image1 from './images/rey_atanagildo.png'
import image2 from './images/rey_ataulfo.png'
import './App.css'

function App() {
  const refSpan = useRef();
  const contNum=(e)=>{
    e.target.textContent = (Number(e.target.textContent)+1);
    if(Number(e.target.textContent)>=8){
      e.target.style.backgroundColor = "red";
    }
    if(Number(refSpan.current.textContent)===10){
      refSpan.current.textContent = 1;
      e.target.style.backgroundColor = "transparent";
    }
  };

  const changeImage = (e)=>{
    let rey = "";
    if(e.target.src.includes("atanagildo")){
      e.target.src = image2;
      rey = "atanagildo";
    }else{e.target.src = image1; rey = "ataulfo";}
    alert(rey);
  }

  const showText = (e)=>{
    console.log(e.target.value);
  }
  return (
    <>
      <span ref={refSpan} onClick={contNum}>0</span>
      <button>Click</button>
      <img src={image1} alt="" onClick={changeImage}/>
      <input type="text" onChange={showText}/>
    </>
  )
}

export default App
