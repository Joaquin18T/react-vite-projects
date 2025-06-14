import {useForm} from 'react-hook-form'
import {Navigate, useNavigate} from 'react-router-dom'
import { datos } from './Data';
import { useContext } from 'react';
import { Contexto } from './Context/Contexto';
import  types  from './Context/Types';

export default function Place() {
  const {register, handleSubmit, formState:{errors}} = useForm();
  const navegacion = useNavigate();
  const {dispatch} = useContext(Contexto);

  const enviarDatos = ({place})=>{
    //console.log(place);
    dispatch({type:types.fase1, payload:{nombre:place}});
    navegacion(`/preguntas`);
  }
  return (
    <>
      <form onSubmit={handleSubmit(enviarDatos)} className='form-principal'>
        <div className='row-send'>
          <span>Selecciona una zona a visitar:</span>
          <button>Enviar</button>
          <div>
            {errors.place?.type==="required"&&
            <span>Elige una opcion</span>}
          </div>
        </div>
        <div className='lugares' >
          {
            datos.map(({lugar, precio, imagen})=>(
              <div key={lugar} className='lugar'>
                <input type="radio" name="select-place" value={lugar} 
                {...register("place",{required:true})}/>

                <div>{lugar}</div>
                <div>({precio}$)</div>
                <img src={imagen}/>
              </div>
            ))
          }
        </div>

      </form>
    </>
  )
}
