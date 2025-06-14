import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { addPlace, deletePersona } from '../Store/Slices';


const regionesFunciones = [
  { region: "África", funciones: ["Ventas", "Logística"] },
  { region: "América", funciones: ["Organización", "Comercial"] },
  { region: "Asia", funciones: ["Distribución", "Supervisión"] },
  { region: "Europa", funciones: ["Ventas", "Comercial"] },
  { region: "Oceanía", funciones: ["Distribución", "Marketing"] }
];

export default function Contratados() {
  const data = useSelector(state=>state.oneSlice.contratados);
  const navegacion = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    console.log(data);
    
  },[data]);

  const navigateTo=()=>{
    navegacion('/candidatos');
  }

  const eliminarPersona = (id)=>{
    dispatch(deletePersona(id));
  }

  const agregarPlace = (id, e)=>{
    //console.log(id.target.value);
    dispatch(addPlace({
      id:id,
      place:e.target.value
    }));
  }
  return (
    <div>
      <div className='header-contratos'>
        <h3>USUARIOS:</h3>
        <button onClick={navigateTo} className='btn-blue'>Candidatos</button>
      </div>
      <div className='contain-contratos'>
        {
          data.map((x)=>(
            <div className='contrato' key={x.id}>
              <img src={x.photo} alt="" />
              <h4>{x.lastName}, {x.name}</h4>
              <p>{x.stateCountry}</p>
              <p>({x.country})</p>
              <select className='places' onChange={(e)=>agregarPlace(x.id,e)} defaultValue={!!x.place?x.place:""}>
                <option>Selecciona</option>
                {
                  regionesFunciones.map(({region, funciones})=>(
                    funciones.map(x=>(
                      <option key={`${region}-${x}`} value={`${region}-${x}`}>
                        {`${region}-${x}`}</option>
                    ))
                  ))
                }
              </select>
              <button onClick={()=>eliminarPersona(x.id)} className='eliminar-contrato'>Eliminar</button>
            </div>
          ))
        }
      </div>
    </div>
  )
}
