
export default function Actividad3({data}) {
  
  const filtrado = data.find(rey=>rey.nombre.substring(0,1)==="e" ||rey.nombre.substring(0,1)==="E");
  console.log(filtrado);
  
  return (
    <div>
      {
        filtrado.nombre==undefined?"No se ha encontrado":filtrado.nombre
      }
    </div>
  )
}
