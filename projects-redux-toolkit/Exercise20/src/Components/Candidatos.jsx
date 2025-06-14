import React, { useEffect, useRef, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { addCandidato, addPersona, eliminarCandidato } from '../Store/Slices';
import {useNavigate} from 'react-router-dom'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Candidatos() {
  const refRender = useRef(false);
  const [candidatos, setCandidatos] = useState([]);
  const emptys = ["", "", "", "", "",""];
  const data = useSelector(state=>state.oneSlice.contratados);
  const listCandidatos = useSelector(state=>state.sldCandidatos.candidatos);
  const dispatch = useDispatch();
  const navegacion = useNavigate();

  const getPersonas = async(num)=>{
    const data = await fetch(`https://randomuser.me/api/?results=${num}`);
    const resp = await data.json();
    return resp;
  }
  const personas = async(num)=>{
    const data = await getPersonas(num);
    let valores;

    if(listCandidatos.length===0){
      valores = structureData(data.results);
      dispatch(addCandidato(valores));
    }else{
      valores = listCandidatos;
    }

    setCandidatos(valores);
  };

  const structureData = (data)=>{
    const datos = data.map(x=>{
      return {
        picture:x.picture.large,
        title:x.name.title,
        firstName: x.name.first,
        lastName:x.name.last,
        address:x.location.state,
        country:x.location.country,
        email:x.email,
        phone:x.phone,
        username:x.login.username,
        id:x.login.uuid
      }
    });
    return datos;
  }
  
  useEffect(()=>{
    if(!refRender.current){
      personas(6);
      refRender.current = true;
    }
    
    
  },[]);

  useEffect(()=>{
    console.log(listCandidatos);
    console.log(candidatos);
    
  },[candidatos]);

  const filtrarPersona = async(id)=>{
    const filtrado = candidatos.filter(x=>x.username!==id);
    dispatch(eliminarCandidato(id));

    const nuevaPersona = await getPersonas(1);
    //console.log(filtrado);
    setCandidatos([...filtrado, ...structureData(nuevaPersona.results)]);

    const nuevoOBJ = structureData(nuevaPersona.results);
    dispatch(addCandidato(nuevoOBJ));
    //console.log(listCandidatos);
  }

  const contratarPersona = (data)=>{
    const {firstName, lastName, address, country, id, picture, username} = data;
    dispatch(addPersona({
      lastName:lastName,
      name:firstName,
      stateCountry:address,
      country: country,
      photo: picture,
      id:id
    }));

    filtrarPersona(username);
    //console.log(listCandidatos);
  }

  const navegarTo = ()=>{
    navegacion('/contratados');
  }

  return (
    <>
      <div className='header-candidato'>
        <h3>CANDIDATOS:</h3>
        <div>
          {candidatos.length===0?
            (<Skeleton width={120} height={30} highlightColor="gray"/>):
            <button onClick={navegarTo} className='btn-blue'>Contratados</button>
          }
        </div>
      </div>
      <div className='contain-candidatos'>
        {
          candidatos.length===0?
            emptys.map((x,i)=>(
              <Skeleton width={600} height={150} highlightColor="gray" key={i}/>
            ))
          :
          candidatos.map((x,i)=>(
            <div className="candidato" key={i}>
              <img src={x.picture} alt="" className='img-candidato'/>
              <div className='dato-candidato'>
                <h3>{x.title} {x.firstName} {x.lastName}</h3>
                <span>Address: {x.address} ({x.country})</span>
                <span>{x.email}</span>
                <span>{x.phone}</span>
              </div>
              <div className='acciones-candidato'>
                <button onClick={()=>contratarPersona(x)} className='btn-blue'>Contratar</button>
                <button onClick={()=>filtrarPersona(x.username)} className='btn-blue'>Ocultar</button>
              </div>
            </div>
          ))
        }
      </div>
      <div className='prev-contratos'>
        {
          data.map(x=>(
            <button key={x.id} onClick={navegarTo} className='btn-prev'>{x.name}</button>
          ))
        }
      </div>
    </>
  )
}
