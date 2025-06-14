import { useState, useRef, useEffect } from "react"
import Contexto from "./Contexto"

const Provider = ({children})=>{
  const [pos, setPos] = useState(0);
  const [global, setGlobal] = useState([]);
  const [people, setPeople] = useState([]);
  const refRender = useRef(false);

  const getPeople = async()=>{
    let temp = [];
    for (let i = 0; i < 5; i++) {
      const data = await saveData(10);
      temp[i] = data.results;
    }
    setGlobal(temp);
    setPeople(temp[pos]);
  }

  const saveData = async(amount)=>{
    const query = await fetch(`https://randomuser.me/api/?results=${amount}`);
    //console.log(data.results);
    const data = await query.json();
    return data;
  }

  useEffect(()=>{
    if(!refRender.current){
      getPeople();
      refRender.current = true;
    }
  },[]);

  const goDirection = (direction)=>{
    setPos(direction);
    //console.log("global", global);
    //console.log(global[direction]);
    return global[direction];
  }
  return(
    <Contexto.Provider value={{people, setPeople, goDirection, pos, global, setGlobal}}>
      {children}
    </Contexto.Provider>
  )
}

export default Provider;