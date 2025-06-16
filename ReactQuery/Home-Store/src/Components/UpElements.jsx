import { useForm } from 'react-hook-form';
import useMutate from '../hooks/useMutate';
import InputField from './InputField';
import { useEffect, useState } from 'react';
import { ask, showToast } from './SweetCustom';

/**
 * Componente reutilizable que actualiza los datos de categorias y unidades de medida
 * @param {*} param0 {name:nombre del elemento, lblInput:texto que ira en el label, nameInput:id y/o name
 * del input,idKey:Nombre de clave para obtencion y modificacion de datos (idname), idValue:id del elemento a actualizar,
 * setCloseModal:metodo para cerrar el modal, refresh:metodo para refrescar la tabla}
 * @returns Un formulario para actualizar elementos
 */
export default function UpElements({name, lblInput, nameInput, idKey, idValue, setCloseModal, refresh}) {
  const [datForm, setDataForm] = useState();//estado que almacena los datos enviados del form
  const [isDisabled, setIsDisabled] = useState(true);//deshabilita / habilita el boton del form
  const {register, formState:{errors}, handleSubmit, getValues, setValue} = useForm({mode:'onChange'});//gestion del form

  //Obtencion de datos del elemento
  const {data,mutate,isSuccess, isPending, isError, error} = 
  useMutate({url:`http://192.168.1.38/home-store/api/${name}.api.php`, queryKey:"getElement", typeQuery:2});

  //Verifica si el elemento existe (por el nombre)
  const {data:exData, mutate:exMutate, isSuccess:exIsSuccess, isPending:exIsPending, isError:exIsError, error:exError} = 
  useMutate({url:`http://192.168.1.38/home-store/api/${name}.api.php`, queryKey:"existElement", typeQuery:2});

  //Actualiza los datos
  const {mutate:upMutate, isSuccess:upIsSuccess, isPending:upIsPending, isError:upIsError, error:upError} = 
  useMutate({url:`http://192.168.1.38/home-store/api/${name}.api.php`, method:"PUT", queryKey:"upElement"});

  useEffect(()=>{
    console.log(name);
    //console.log(idValue);
    const params = new URLSearchParams();
    params.append(idKey, idValue);
    mutate(params);//Cuando se monta el componente, se obtiene los datos del elemento a actualizar
  },[]);

  useEffect(()=>{
    if(isSuccess){
      console.log(data);
      setValue(nameInput, data[0][nameInput]);//Asigna los datos obtenidos al formulario
    }else if(isError){
      showToast(`Error al obtener los datos: ${error.message}`, "ERROR");
      //return;
    }
  },[isSuccess, isError]);

  //Metodo que obtiene los datos enviados del form
  const onSend = (e)=>{
    setDataForm(e);//almacena los datos del form en el state
    const params = new URLSearchParams();
    params.append(nameInput, e[nameInput]);

    exMutate(params);//envia los datos para verificar si existe
  }

  useEffect(()=>{
    if(exIsSuccess){
      if(exData?.valor.length){//Si tiene una cadena de texto...
        showToast(exData?.valor,"WARNING");
      }else{
        updateData();//actualiza los datos
      }
    }else if(exIsError){
      showToast(`Error al validar si existe: ${exError.message}`, "ERROR");
    }
  },[exIsSuccess, exIsError]);

  //Metodo que actualiza los datos
  const updateData = async()=>{
    if(await ask("¿Estas seguro de actualizarlo?")){
      upMutate({[idKey]:idValue, [nameInput]:datForm[nameInput]});
    }
  }

  useEffect(()=>{
    if(upIsSuccess){
      setCloseModal(false);//cierra el modal
      setIsDisabled(upIsSuccess);//deshabilita el boton
      showToast("Elemento actualizado", "SUCCESS");
      refresh();//refresca los datos
    }else if(exIsError){
      showToast(`Error al actualizar: ${error.message}`, "ERROR");
    }
  },[upIsSuccess, upIsError]);

  //Metodo compara los valores de dos objetos
  const compareObjets = (obj1, obj2)=>{
    const values1 = Object.values(obj1);//valores del obj1
    const values2 = Object.values(obj2);//valores del obj2
    console.log(obj1);
    console.log(obj2);
    return values1.every((valor, i)=>valor===values2[i]);//si los valores de los objetos son iguales, entonces true, si no, false
  }

  //Cada vez que se cambia de valor en el form, se ejecuta el metodo
  const detectChanges=()=>{
    const isSame = compareObjets(getValues(), {valor:data[0][nameInput]});
    //compara los valores del form con los datos del primer useMutate
    console.log(isSame);
    setIsDisabled(isSame);//deshabilita o habilita el boton.
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSend)} onChange={detectChanges}>
        <InputField label={`Actualizar ${lblInput}: `} name={nameInput} register={register} errors={errors}
        validates={{required:"Obligatorio*",maxLength:{value:40, message:"Maximo 40 caracteres"},
        minLength:{value:5, message:"Minimo 5 caracteres"}}} classStyles={{clsLabel:"lbl-product", 
          clsInput:"input-width-small"}}
        isDisabled={isPending}/>

        <button type='submit' disabled={isPending||isDisabled} className="style-btn-1-v2" >Actualizar</button>
      </form>
    </div>
  )
}
