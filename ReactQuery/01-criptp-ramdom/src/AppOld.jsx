import { useEffect, useReducer, useRef, useState } from 'react'
import './App.css'

const getRandomNumberFromApi = async()=>{
  const res = await fetch("https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new");
  const numberString = await res.text();

  //throw new Error("help me");
  return parseInt(numberString);
}

function App() {
  const [number, setNumber] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [state, dispatch] = useReducer((x)=>x+1,0);

  const refRender = useRef(false);

  useEffect(()=>{

    if(!refRender.current){
      getRandomNumberFromApi()
      .then(setNumber)
      .catch(e=>setError(e.message));
      refRender.current=true;
    }
  },[state]);

  useEffect(()=>{
    if(number) setIsLoading(false);
  },[number]);

  useEffect(()=>{
    if(error)setIsLoading(false);
  },[error]);

  const onLoadAgain = ()=>{
    refRender.current = false;
    setIsLoading(true);
    dispatch();
  }
  return (
    <>
      <div className='contain-numero-aleatorio'>
        {
          isLoading
            ?(<h2>Cargando...</h2>)
            : (<h2>Numero Aleatorio: {number}</h2>)
        }

        {
          !isLoading && error && (<h3>{error}</h3>)
        }

        <button onClick={onLoadAgain} disabled={isLoading}>
          {
            isLoading?'...':"Nuevo Numero"
          }
        </button>
      </div>
    </>
  )
}

export default App
