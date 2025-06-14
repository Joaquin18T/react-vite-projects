
export default function Product({name, cantidad, actionProd, types}) {
  return (
    <div>
      <span>{name} ({cantidad} unidades) </span>
      <button onClick={()=>{actionProd(name, types.moreU)}}>+</button> 
      <button onClick={()=>{actionProd(name, types.lessU)}}> - </button> 
      <button onClick={()=>actionProd(name, types.deleteProd)}> x </button>
    </div>
  )
}
