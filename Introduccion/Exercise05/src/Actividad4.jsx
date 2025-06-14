

export default function Actividad4({data}) {
  const filtrado = data.filter((x)=>x.vacasComidas>10 && x.reinado>10);

  return (
    <div>
      <h1>ACTIVIDAD 4</h1>
      {
        filtrado.map(x=>(
          <div key={x.nombre}>
            <p>{x.nombre}</p>
            <h2 onClick={
              (e)=>{e.target.textContent=Number(e.target.textContent)+1}}
              >0</h2>
          </div>
        ))
      }
    </div>
  )
}
