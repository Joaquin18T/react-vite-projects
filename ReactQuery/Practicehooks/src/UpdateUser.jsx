import { useForm } from "react-hook-form"
import ListUser from "./ListUser";
import InputField from "./Components/InputField";

import { useEffect, useState } from "react";
import useMutationApi from "./hooks/useMutationApi";
import useTimer from "./hooks/useTimer";

export default function UpdateUser() {

  const {register,handleSubmit, reset, watch, formState:{errors, isSubmitted}, setValue} = useForm();
  const {data, isError, isPending, mutate, isSuccess, error} = useMutationApi("",2);
  const [showText, setShowText] = useState(false);

  const {isError:errorUpdate, isPending:pendingUpdate, isSuccess:succesUpdate, mutate:mutateUp, error:errorUp} = useMutationApi("PUT");

  const [isSelected, setIsSelected] = useState(false);
  
  const getDataUser = (iduser)=>{
    console.log(iduser);
    
    mutate(iduser);

  }

  useEffect(()=>{
    if(isSuccess){
      console.log(data);
      setValue("nombre", data[0].nombre);
      setValue("telefono", data[0].telefono);
      setValue("direccion", data[0].direccion);
      //setIdUpdate();
    }
  },[isSuccess]);

  useEffect(()=>{
    setIsSelected(isPending);
  },[isPending]);

  const updateData = (fields)=>{
    console.log({idusuario:data[0].id, nombre:fields.nombre, telefono:fields.telefono, direccion:fields.direccion})
    mutateUp({idusuario:data[0].id, nombre:fields.nombre, telefono:fields.telefono, direccion:fields.direccion});
  }

  useEffect(()=>{
    if(succesUpdate){
      reset();
      setShowText(true);
      const timer = useTimer(setShowText, 2500);
      return ()=>clearTimeout(timer);
    }
  },[succesUpdate]);
  return (
    <div className="contain-update">
      <div className="contain-form-update">
        <form onSubmit={handleSubmit(updateData)}>
          <InputField textLbl={"Nombre:"} forLbl={"nombre"} idInpt={"nombre"} register={register} 
          validates={{required:"El nombre es obligatorio", maxLength:10, txtMaxLength:"El maximo es de 10 caracteres"}} 
          errors={errors}
          isSubmitted={isSubmitted} watch={watch}/>

          <InputField textLbl={"Telefono:"} forLbl={"telefono"} idInpt={"telefono"} typeInpt='number' register={register} 
            validates={{required:"El telefono es obligatorio", maxLength:9, minLength:9,txtMaxLength:"Solo 9 numeros como maximo",
              txtMinLength:"No se permite menos de 9 numeros"
            }} errors={errors} isSubmitted={isSubmitted} watch={watch}/>
          
          <InputField textLbl={"Direccion:"} forLbl={"direccion"} idInpt={"direccion"} register={register} 
          validates={{required:"La direccion es obligatorio", maxLength:15,txtMaxLength:"El maximo es de 15 caracteres"}} 
          errors={errors} isSubmitted={isSubmitted} watch={watch}/>

          <button type="submit" disabled={pendingUpdate}>Actualizar cambios</button>
        </form>
        <div>{isError&&`Hubo un error al obtener datos del usuario:${error.message}`}</div>
        <br/>
        {showText&&
          <div>Se ha actualizado correctamente</div>
        }
        <div>{errorUpdate&&errorUp.message}</div>

      </div>
      <div className="contain-list-update">
        <ListUser isUpdate={true} getData={getDataUser} isSelected={isSelected}/>
      </div>
    </div>
  )
}
