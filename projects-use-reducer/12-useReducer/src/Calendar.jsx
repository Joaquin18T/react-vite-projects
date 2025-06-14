import { useReducer, useState } from "react"

const types={
  masM:"masM",
  menosM:"menosM",
  masY:"masY",
  menosY:"menosY"
}

const date = new Date();
const month = date.getMonth();
const year = date.getFullYear();

const initialState = {m: month, y:year}
const reducer=(state, action)=>{
  let currentMonth = state.m;
  let currentYear = state.y;
  switch(action.type){
    case types.masM:
      if(currentMonth===11){
        currentMonth = 0;
        currentYear++;
      }else{
        currentMonth++;
      }
      break;
    case types.menosM:
      if(currentMonth===0){
        currentMonth = 11;
        currentYear--;
      }else{
        currentMonth--;
      }
      break;
    case types.masY:
      currentYear = action.payload+currentYear;

      break;
    case types.menosY:
      currentYear = currentYear - action.payload;
  }
  return {y:currentYear, m:currentMonth};
}

export default function Calendar() {
  const [date, dispatch] = useReducer(reducer, initialState);
  const [unidad, setUnidad] = useState(0);
  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  return (
    <div>
      <span style={
        (date.m<month && date.y<=year)||date.y<year?
        {color:"red"}:{color:"green"}}>{meses[date.m]} ({date.y})</span>
      <div>
        <button onClick={()=>dispatch({type:types.masM})}>+</button>
        <span>Month: </span>
        <button onClick={()=>dispatch({type:types.menosM})}>-</button>
      </div>
      <div>
        <button onClick={()=>dispatch({type:types.masY, payload:Number(unidad)})}>+</button>
        <input type="number" value={unidad} onChange={(e)=>{setUnidad(e.target.value)}}/>
        <span>Year:</span>
        <button onClick={()=>dispatch({type:types.menosY,payload:Number(unidad) })}>-</button>
      </div>
    </div>
  )
}
