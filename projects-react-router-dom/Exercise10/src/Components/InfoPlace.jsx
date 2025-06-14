import { useNavigate, useParams } from "react-router-dom"
import data from "./Data";
import { useContext, useEffect, useRef, useState } from "react";
import { Contexto } from "../Context/Contexto";

export default function InfoPlace() {
  const params = useParams();
  const infoP = data.find((place)=>place.nombre===params.data);
  const {contratarLugar, anularLugar} = useContext(Contexto);
  const {placeContratos} = useContext(Contexto);
  const {total, setTotal} = useContext(Contexto);

  const isExist = placeContratos.some((place)=>place.name===params.data);
  const [estado, setEstado] = useState(isExist);
  
  const contratar=()=>{
    if(!estado){
      contratarLugar(infoP.nombre, infoP.precio);
      setTotal(infoP.precio + total);
    }else{
      anularLugar(infoP.nombre);
    }
    setEstado(!estado);
  }
  useEffect(()=>{
    console.log(placeContratos);
    
  },[]);

  const navegacion = useNavigate();
  const volver=()=>{
    navegacion(-1);
  }
  return (
    <div className="contain-info-place">
      <h1>{infoP.nombre}</h1>
      <h3>{infoP.servicio}</h3>
      <div className="btn-info-place">
        <span>{infoP.precio}$</span>
        <div>
          <button onClick={contratar} className={!estado?"btnGreen":"btnRed"}>
            {!estado?"Contratar":"Anular"}
          </button>
          <button onClick={volver}>volver</button>
        </div>
      </div>
      <img src={`/images/${infoP.imagen}`} alt="" />
    </div>
  )
}
