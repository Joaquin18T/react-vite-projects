import { useState } from 'react'
import {useForm} from "react-hook-form"
import { validarPrefijo } from './validarPrefijo';
import './App.css'


export function App() {
  //
  const {register, handleSubmit, formState:{errors}, watch,
  setFocus, resetField} = useForm();
  const getValores = (data)=>{ //data son todos los valores del formulario
    console.log(data);
    resetField("telefono");
    setFocus("telefono");
  }
  return (
    <>
      <form onSubmit={handleSubmit(getValores)}>
        <div className='pregunta'>
          <label htmlFor="nombre" className="">Nombre:</label>
          <input type="text" id="nombre" placeholder='Tu name' autoFocus
          {...register("nombre",{required:true, maxLength:15})}/>
        </div>
        {errors.nombre?.type === "required" &&
          <div className='aviso'>El nombre de usuario es obligatorio</div>} 
        {errors.nombre?.type === "maxLength" &&
        <div className='aviso'>Maximo 15 caracteres</div>}
        {/* 
          type: tipo de error de acuerdo a las validaciones de arriba 
          uso del ?:al principio el input no tiene un valor, por lo que generara un error si no se usa
          uso de &&: significa el 'entonces...' de una condicion
        */}

        <div className='pregunta'>
          <label htmlFor="edad" className="">Edad:</label>
          <input type="number" id="edad" placeholder='Tu edad'
          {...register("edad",{min:1, max:120})}/>
        </div>
        {errors.edad?.type === "min" &&
          <div className='aviso'>El minimo es 1</div>}
        {errors.edad?.type === "max" &&
          <div className='aviso'>El maximo es 120</div>}

        <div className='pregunta'>
          <label htmlFor="email" className="">Email:</label>
          <input type="text" id="email" placeholder='Tu email'
          {...register("email",{pattern:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          })}/>
        </div>
        {errors.email?.type === "pattern" &&
          <div className='aviso'>El correo electronico es invalido</div>}

        <div className='pregunta'>
          <label htmlFor="telefono" className="">Telefono:</label>
          <input type="number" id="telefono" placeholder='Tu telefono'
          {...register("telefono", {validate:validarPrefijo})}/>
        </div>
        {errors.telefono?.type === "validate" &&
          <div className='aviso'>el prefijo debe ser de Peru</div>}
        <div className="">
          <input type="submit" />
        </div>
      </form>
      <div>
        {
          watch("nombre") &&
          <div>Me llamo {watch("nombre")}
            {watch("edad") &&
            <span> y tengo {watch("edad")} anios</span>}
          </div>
        }

      </div>
    </>
  )
}


