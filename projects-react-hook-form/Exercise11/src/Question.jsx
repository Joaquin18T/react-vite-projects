import { useContext, useRef, useState } from 'react'
import Resumen from './Resumen'
import { useForm } from 'react-hook-form'
import { preguntas } from './Data';
import { Contexto } from './Context/Contexto';
import {useReactToPrint} from 'react-to-print';
import { useNavigate } from 'react-router-dom';

export default function Question() {
  const {register, handleSubmit, formState:{errors}, watch, resetField} = useForm();
  const [next, setNext] = useState(0);
  const [print, setPrint] = useState(false);
  const {onSendData, resetData, setTotal} = useContext(Contexto);
  const refComponent = useRef();
  const navegacion = useNavigate();

  const printComponent = ()=>{
    const contentToPrint = refComponent.current;
    setPrint((e)=>!e);

    //Esperar a que react actualize los cambios
    setTimeout(()=>{
      const printWindow = window.open('', '_blank');
      printWindow.document.open();
  
      printWindow.document.write(`
        <html>
          <head>
            <title>Impresión</title>
            <style>
              .resumen{
                display: flex;
                flex-direction: column;
                align-items: self-start;
              }
              .total{
                font-size: larger;
              }
            </style>
          </head>
          <body>
            ${contentToPrint.outerHTML} 
          </body>
        </html>
      `);
      //setPrint((e)=>!e);
  
      printWindow.document.close();
      
      // Llama a imprimir después de cargar
      printWindow.onload = () => {
        printWindow.print();
        printWindow.close();
        setPrint((e)=>!e);
      };
    },0);
  }

  const enviarDato=({pregunta})=>{
    if(next<preguntas.length-1){
      onSendData(`pregunta${next+1}`, pregunta);
      setNext(next+1);
      resetField("pregunta");
    }
    console.log(pregunta);
    
  }

  const volver =()=>{
    resetData();
    setNext(0);
    setTotal(0);
    navegacion('/form');
  }
  return (
    <>
      <div className='contain-preguntas'>
        <form className='preguntas' onSubmit={handleSubmit(enviarDato)}>
          <div className='pregunta-contain'>
            <label htmlFor="pregunta">{preguntas[next].pregunta}:</label>
            <div>{watch("pregunta")&& <span>{watch("pregunta")} {preguntas[next].sufijo}</span> }</div>
          </div>
          {
            preguntas[next].tipo===0?
            <>
              <input type={preguntas[next].input} id='pregunta' 
              {...register("pregunta", {required:true, max:preguntas[next].validaciones?.maxValue, 
                min:preguntas[next].validaciones?.minValue})}/>

              {errors.pregunta?.type==="required"&&
              <div>{preguntas[next].validaciones.requerido}</div>}

              {errors.pregunta?.type==="max"&&
              <div>{preguntas[next].validaciones.maximo}</div>}

              {errors.pregunta?.type==="min"&&
              <div>{preguntas[next].validaciones.minimo}</div>}

              <input type="submit" />
            </>:
            <>
              <button onClick={volver}>Volver</button>
              <button type='button' onClick={printComponent}>Imprimir</button>
            </>
          }
        </form>
        <div ref={refComponent}>
          <Resumen isPrinter={print}/>
        </div>
      </div>
    </>
  )
}
