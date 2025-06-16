import React, { useState } from 'react';
import { useEffect, useRef } from 'react';
import useMutationApi from '../hooks/useMutationApi';
import InputField from './InputField';
import {useForm} from 'react-hook-form'
import ListUser from '../ListUser';
import useTimer from '../hooks/useTimer';

export default function CreateUser() {
  const {register, handleSubmit, formState:{errors, touchedFields, isSubmitted}, trigger, reset, watch} = useForm();

  const {isPending, isSuccess, isError, error, mutate} = useMutationApi("POST");

  const [showText, setShowText] = useState(false);

  const sendData = (data)=>{
    console.log(data);
    mutate(data);
  }

  //console.log(...register());
  useEffect(()=>{
    if(isSuccess){
      reset();
      //refTextSuccess.current.innerHTML="<p>Usuario registrado correctamente</p>";
    }

  },[isSuccess]);

  useEffect(()=>{
    if(isSuccess){
      setShowText(true);
      const timer = useTimer(setShowText, 2500);

      return ()=>clearTimeout(timer); //Se limpia el timeout si se desmonta el componente
    }
    //console.log(parseInt(refTextSuccess.current.children.length));
  },[isSuccess]);

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(sendData)}>
          <InputField label="Nombre:" name="nombre" register={register} 
          validates={{
            required:"El nombre es obligatorio", 
            maxLength:{value:10, message:"El máximo es de 10 caracteres"}
          }} 
          errors={errors}
          watch={watch}/>

          <InputField label={"Correo:"} name={"correo"} register={register} 
          validates={{required:"El Correo es obligatorio", 
          pattern:{value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message:"Correo no valido"}}} 
          errors={errors} watch={watch}/>

          <InputField label={"Clave de acceso:"} name={"password"} type='password' register={register} 
          validates={{required:"Clave de acceso es obligatorio"}} errors={errors}  watch={watch}/>

          <InputField label={"Telefono:"} name={"telefono"} type='number' register={register} 
            validates={{required:"El telefono es obligatorio", 
              maxLength:{value:9, message:"Maximo 9 digitos"}, 
              minLength:{value:9, message:"Minimo 9 digitos"}
            }} 
            errors={errors} watch={watch}/>

          <InputField label={"Direccion:"} name={"direccion"} register={register} 
          validates={{required:"La direccion es obligatorio", 
            maxLength:{value:15, message:"Maximo 15 caracteres"}}} 
            errors={errors}  watch={watch}/>

          <button disabled={isPending} type='submit'>
            {isPending?"Registrando...":"Registrar usuario"}
          </button>
        </form>
        {showText&&
          <div>
            <p>Usuario registrado correctamente</p>
          </div>
        }
        <div>
          {isError&&<p>{error.message}</p>}
        </div>
      </div>
      <ListUser/>
    </div>
  )
}
