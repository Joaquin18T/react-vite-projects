import React, { useEffect, useMemo, useState } from 'react'

export default function NumPrimos() {
  const [valor, setValor] = useState(0);

  const primesNumbers = useMemo(()=>{
    
    const temp=[];
    let j=0;
    let cont=0;
    for(let i=1; i<valor; i++){
      for(let x=1; x<=i;x++){
        if(i%x===0){
          cont++;
        }
      }
      if(cont===2){
        temp[j]=i;
        j++;
      }
      cont=0;
    }
    return temp;
  },[valor]); 
    
  return (
    <div>
      <div>
        <label htmlFor="numero">Ingresa un numero limite:</label>
        <input type="number" min={1} onChange={(e)=>setValor(Number(e.target.value))}/>
      </div>
      <div>{primesNumbers.join(", ")}</div>
    </div>
  )
}
