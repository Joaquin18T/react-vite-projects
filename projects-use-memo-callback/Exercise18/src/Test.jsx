import React, { useCallback, useEffect, useState } from 'react'

export default function Test() {
  const [date, setDate] = useState();
  const list = ["cat", "dog", "parrot"];
  const animals = {...list};
  const fecha = useCallback(()=>{
    const now = new Date();
    const hours = now.getHours(); // Horas (0 - 23)
    const minutes = now.getMinutes(); // Minutos (0 - 59)
    const seconds = now.getSeconds(); // Segundos (0 - 59)
    const currentDate=`Hora actual: ${hours}:${minutes}:${seconds<10?`0${seconds}`:seconds}`;
    
    setDate(currentDate);
  },[]);

  setTimeout(fecha, 1000);

  const estilos = {
    backgroundColor:"red",
    color:"white",
    borderRadius:5
  };

  useEffect(()=>{
    console.log(animals);
    
    const list = [3,6, ,[7,9]];
    console.log(list.flat());
    
  },[])

  return (
    <div style={estilos}>
      {date}
    </div>
  )
}
