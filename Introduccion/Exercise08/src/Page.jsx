import { useParams } from "react-router-dom"

export default function Page() {
  const rey = useParams();
  const palabra = rey.data.slice(1, rey.data.length+1);
  const nuevaPalabra = `${rey.data.charAt(0).toUpperCase()}${palabra}`;
  
  const dataImg = `https://www.html6.es/img/rey_${rey.data}.png`;
  return (
    <div className="page">
      <img src={dataImg} alt="" />
      <span className="nombre_rey">{nuevaPalabra}</span>
    </div>
  )
}
