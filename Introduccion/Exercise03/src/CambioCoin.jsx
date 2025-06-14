import { useRef, useState } from "react"
export default function CambioCoin() {

  const cambios=[
    {
      moneda: "Peso argentino",
      cambio:118.6,
    },{
      moneda: "Peso colombiano",
      cambio:4543.5,
    },{
      moneda: "Peso mexicano",
      cambio:23.2,
    },{
      moneda: "Dólar",
      cambio:1.14
    }
  ]
  const [monedaChange, setMonedaChange] = useState([0,0,0,0]);

  const cambiarMoneda = (e)=>{
    let euro = Number(e.target.value);
    setMonedaChange([(euro*cambios[0].cambio), (euro*cambios[1].cambio), (euro*cambios[2].cambio), (euro*cambios[3].cambio)]);
  }
  return (
    <div>
      <div>
        <label htmlFor="euro">Euro</label>
        <input type="number" id="euro" onChange={cambiarMoneda}/>
      </div>
      {
        cambios.map(({moneda},i)=>(
          <div key={moneda}>
            <label htmlFor={moneda}>{moneda}</label>
            <input type="text" id={moneda} readOnly value={monedaChange[i]}/>
          </div>
        ))
      }
    </div>
  )
}
