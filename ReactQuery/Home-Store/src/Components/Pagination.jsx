import React from 'react'

/**
 * Crea la paginacion en el foot de una tabla
 * @param {Object} param0 Objetos con props ya definidas: (page:Pagina actual, onPage:Funcion que cambia de pagina, como parametro
 * recibe la direccion, izquierda(1), derecha(2)) - (totalPages:Paginas totales que tiene los datos) - (spanCol:
 * Opcional. Combinacion de columnas, por defecto es 1) - (styles:Objeto; estilos; stylesTd, styleBtnLfy, 
 * styleBtnRgt) - (direction: Objecto; direcciones que tiene lap paginacion; izquierda(1), derecha(2)) - 
 * (refs: Objecto; Referencias a los dos botones: left, right)
 * @returns Un elemento foot con botones
 */
export default function Pagination({page, onPage,totalPages, spanCol=1, styles={}, direction={}, refs={}}) {
  const {left, right} = direction;//numero de pagina de cada boton
  const {refLeft, refRight} = refs; //referencia de cada boton para deshabilitarlo
  const {stylesTd, styleBtnLft, styleBtnRgt} = styles; //estilos

  //console.log(page);
  return (
    <tfoot>
      <tr>
        <td colSpan={spanCol} style={stylesTd}>
          <button onClick={()=>onPage(left)} disabled={page===1||refLeft} className={styleBtnLft}>
            {page-1===0?"-":page-1}
          </button>
          <button disabled={page===totalPages||refRight}  onClick={()=>onPage(right)}  className={styleBtnRgt}>
            {page+1>totalPages?"-":page+1}
          </button>
        </td>
      </tr>
    </tfoot>
  )
}
