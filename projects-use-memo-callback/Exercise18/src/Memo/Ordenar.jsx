import React, { useMemo, useState } from 'react'

export default function Ordenar() {
  const [orden, setOrden] = useState(0);
  const people = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 20 }
  ];

  const ordenarDatos = useMemo(()=>{
    console.log("hola");
    
    let ordenado = [];
    switch(orden){
      case 2:
        ordenado = [...people].sort((a,b)=>a.name.localeCompare(b.name));
        break;
      case 1:
        ordenado= [...people].sort((a,b)=>a.age-b.age);
        break;
    }
    return ordenado;
  },[orden]);
  
  return (
    <div>
      <div>
        <button onClick={()=>setOrden(1)}>Ord. edad</button>
        <button onClick={()=>setOrden(2)}>Ord. Nombre</button>
      </div>
      <div>
        {
          ordenarDatos.map(({name, age})=>(
            <div key={name}>{name} {age}</div>
          ))
        }
      </div>
    </div>
  )
}
