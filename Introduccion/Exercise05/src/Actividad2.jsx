

export default function Actividad2({data}) {
  const datosFiltrados = data.filter(rey=>!rey.nombre.includes("g"));
  
  const eliminar=(e)=>{
    e.target.parentNode.remove();
  }

  return (
    <div>
      <h1>ACTIVIDAD 2</h1>
      {
        datosFiltrados.map(({nombre})=>(
          <div key={nombre}>
            <span>{nombre}</span>
            <button onClick={eliminar}>Remover</button>
          </div>
        ))
      }
    </div>
  )
}
