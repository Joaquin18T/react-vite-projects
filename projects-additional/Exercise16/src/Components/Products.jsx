import { useContext, useEffect, useState } from 'react';
import Contexto from '../Context/Contexto';

export default function Products({dataProd, outDataProd}) {
  const {addProducto, setPresupuesto, presupuesto, prodElegidos,
    productos, setProductos, buscarProducto
  } = useContext(Contexto);

  const overDataProducto = (idprod)=>{
    dataProd(idprod);
  };

  const selectProd = (idprod)=>{
    const producto = buscarProducto(idprod);
    addProducto(producto);

    setProductos(productos.map((x)=>{
      if(x.id===idprod){
        return {...x, disponible:false};
      }else{
        return x;
      }
    }));
    
    setPresupuesto((e)=>e-producto.precio);
    outDataProd();
  };


  useEffect(()=>{
    //console.log(productos);
  },[prodElegidos]);

  return (
    <>
      {
        productos.filter(({disponible, precio})=>disponible && precio<=presupuesto).map(({imagen,id})=>(
          <img src={`/img/${imagen.toLowerCase()}`} key={id} className='producto-img' 
          onMouseOver={()=>{overDataProducto(id)}}
          onMouseOut={()=>outDataProd()}
          onClick={()=>{selectProd(id)}}/>
        ))
      }
    </>
  )
}
