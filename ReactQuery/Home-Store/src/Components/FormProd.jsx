import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import InputField from './InputField';
import SelectComp from './SelectComp';
import { ask, showToast } from './SweetCustom';
import useMutate from '../hooks/useMutate';
import GetElements from './GetElements';

/**
 * Hook personalizado de un form
 * @param {Object} param0 Objeto con props definidos(defaultV: valores por defecto del form)-(typeForm:tipo de form; registrar(1),
 * actualizar(2))-(idproducto:id del producto a actualizar)-(httpMethod:metodo HTTP segun el typeForm)-(filterProduct:metodo para
 * refrescar la tabla productos)-(closeModal:useState para cerrar el modal)-(nameClasses:estilos; contain_inputs(contenedor de 
 * los inputs), contain_buttons(contenedor de botones), contain_selects(contenedor de selects), contain_fields(contenedor 
 * principal dentro del form))
 * @returns Formulario con los campos de un producto
 */
export default function FormProd({defaultV, typeForm, idproducto=0,httpMethod, filterProduct,closeModal, nameClasses}) {
  const urlProd = "http://192.168.1.38/home-store/api/product.api.php";//url de producto
  const {contain_inputs, contain_buttons, contain_selects, contain_fields} = nameClasses; //clases para los estilos
  const [categorias, setCategorias] = useState([]);//lista de categorias
  const [unidades, setUnidades] = useState([]);//lista de unidades de medida
  const [eForm, setEForm] = useState();//valores del formulario
  const refBtn = useRef();//referencia al boton de enviar los datos del formulario
  const {handleSubmit, control, reset, setValue, register, formState:{errors}, getValues} = useForm({
    mode:'onChange',
    defaultValues:defaultV
  });//Propiedades del useForm, definiendo el modo del form y los valores por defecto
  //control:sirve para manejar un campo no nativo de HTML de manera controlada, siguiendo sus valores y validaciones
  const {isSuccess,isPending,isError,error,mutate} = 
  useMutate({url:urlProd,queryKey:"productQuery", method:httpMethod});//Envio y/o modificacion de datos

  const {isSuccess:upIsSuccess, data:upData, isPending:upIsPending, isError:upIsError, error:upError, mutate:upMutate} = 
  useMutate({url:urlProd, queryKey:"productQuery", typeQuery:2});//Obtiene los datos del producto a actualizar

  const {isSuccess:exIsSuccess, data:exData, mutate:exMutate, isError:exIsError, error:exError} = 
  useMutate({url:urlProd, queryKey:"existNomProd", typeQuery:2});//Obtiene los datos de un producto por su nombre(verifica si existe)

  //Obtencion de los datos de categorias y unidades de medida
  const {firstQuery, secondQuery} = GetElements({firstUrl:"http://192.168.1.38/home-store/api/categoria.api.php", 
    firstQueryKey:"categoria", secondUrl:"http://192.168.1.38/home-store/api/unidad-medida.api.php", secondQueryKey:"unidad"});

  useEffect(()=>{
    //si el typeForm es 2, obtiene los datos del producto de acuerdo al id
    if(idproducto && typeForm===2){
      console.log(idproducto);
      const params = new URLSearchParams();
      params.append("idproducto", idproducto);
      upMutate(params);
    }
  },[]);

  /**
   * Encuentra un valor de acuerdo al id
   * @param {Array} data lista de datos 
   * @param {Number} id id del producto 
   * @returns un objeto de acuerdo al id
   */
  const findObject = (data, id)=>{
    const encontrado = data.find(obj=>obj.value===id);
    console.log(encontrado);
    return encontrado;
  }
  useEffect(()=>{
    //Si el typeForm es igual a 2, asigna valores a los campos del form
    if(upIsSuccess && typeForm===2){
      //resetQueryEx();
      console.log(upData);
      setValue("nombre", upData[0]?.nombre);
      setValue("stock", upData[0]?.stock);
      setValue("precio", upData[0]?.precio);
      setValue("categoria", findObject(categorias,upData[0]?.idcategoria));
      setValue("unidad_medida", findObject(unidades, upData[0]?.idunidad_medida));
    }
  },[upIsSuccess]);

  /**
   * Compara los valores de dos objetos
   * @param {Object} obj1 Primer objeto a comparar
   * @param {Object} obj2 Segundo objeto a compara
   * @returns booleano donde si todos los valores son igual, false si no.
   */
  const compareObjets = (obj1, obj2)=>{
    const values1 = Object.values(obj1);
    const values2 = Object.values(obj2);
    console.log(obj1);
    console.log(obj2);
    return values1.every((valor, i)=>valor===values2[i]);
  }

  //detecta los cambios que se hacen en los campos del form
  const detectChanges=()=>{
    if(typeForm===2){
      const {categoria, unidad_medida, stock} = getValues();//desestructura para obtenes valores en concreto
      console.log(getValues());
      const valores = {...getValues(), stock: parseInt(stock),categoria:categoria?.value, unidad_medida:unidad_medida?.value};
      //console.log("valores inputs: ",getValues());
      const {nombre, stock:_stock, precio, idcategoria:_categoria, idunidad_medida:_idunidad} = upData[0];//datos del prod si existe
      const allSame = compareObjets(valores, {nombre:nombre, stock:_stock, precio:precio, categoria:_categoria, unidad:_idunidad});
      console.log("iguales valores?: ", allSame);//muestra si son iguales (entre los datos del form y del prod)
      if(allSame){//Si existe deshabilita el boton de enviar
        refBtn.current.disabled = true;
      }else{
        refBtn.current.disabled = false;
      }
    }
  }

  /**
   * Crea un array de objetos para los Selects
   * @param {Array} data lista de datos
   * @param {String} id clave del id de los datos 
   * @param {String} text clave del texto de los datos
   * @returns un array de objetos 
   */
  const optionsSelect=(data=[], id, text)=>{
    let copy = [];
    data.map((valor)=>{
      copy = [...copy, {value:valor[id], label:valor[text]}];
    });
    //console.log(copy);
    return copy;
  }
  useEffect(()=>{
    //Ordena los datos para que se muestren en los Selects
    let copyCategoria = [];
    let copyUnidad = [];

    if(firstQuery.isSuccess && secondQuery.isSuccess){
      copyCategoria = optionsSelect(firstQuery.data, "idcategoria", "categoria");//ordena los datos
      copyUnidad = optionsSelect(secondQuery.data, "idunidad_medida", "unidad_medida");
    }
    //let copyUnidad = optionsSelect

    setCategorias(copyCategoria);//actualiza el state 
    setUnidades(copyUnidad);
  },[firstQuery.isSuccess, secondQuery.isSuccess]);

  /**
   * Metodo que envia/actualiza los datos
   * @param {*} e objeto de los valores de los campos del formulario
   */
  const sendDatos = async(e)=>{
    const {nombre, stock, precio, categoria, unidad_medida} = e;//desestructuacion
    const question = typeForm===2?"¿Estas seguro de actualizar los datos?":"¿Estas seguro de registrar?";//preguntar al user

    if(await ask(question)){//si confirma la accion
      let mutar = {
        idcategoria: categoria.value, idunidad_medida:unidad_medida.value,
        nombre:nombre, stock:stock, precio:precio
      };//preparan los datos para registrar
  
      if(typeForm===2){
        mutar = {
          idproducto:idproducto, idcategoria: categoria.value, 
          idunidad_medida:unidad_medida.value, nombre:nombre, stock:stock, precio:precio
        };//Se preparan los datos para actualizar
      }
      console.log("datos enviados: ", e);
      mutate(mutar);//muta los datos
    }
  }

  /**
   * metodo que obtiene los datos del form al enviar los datos
   * @param {Object} e valores del form 
   */
  const onSend=async(e)=>{
    setEForm(e);//valores del form
    const params = new URLSearchParams();
    params.append("nombre", e.nombre);
    await exMutate(params);//muta los datos para confirmar si existe un producto similar
  }
  useEffect(()=>{
    //verifica si existe un producto
    if(exIsSuccess){
      console.log(exData?.valor);

      if(exData?.valor===0 || typeForm===2){
        sendDatos(eForm);
      }

      if(exData?.valor!==0 && typeForm===1){
        showToast(exData?.valor, "ERROR");
        // setMessage(exData?.valor);
        // setIsShow(true);
        // const timer = useTimer(setIsShow, 2500);
        // return ()=>clearTimeout(timer);
      }
    }
  },[exIsSuccess]);

  useEffect(()=>{
    //Confirmacion si la mutacion de datos es correcta o no (enviar los datos del form)
    let text = "";
    let type = "SUCCESS";
    if(isSuccess){
      const msg = typeForm===2?"Datos Actualizados":"Registrado correctamente";
      text = msg;
      if(typeForm===2){
        refBtn.current.disabled = true;
        closeModal();//cierra modal al actualizar los datos
      }else{
        reset();//limpia el form
      }
      filterProduct();//actualiza la tabla de prods
      // setIsShow(true);
      // const timer = useTimer(setIsShow, 2000);
      // return ()=>clearTimeout(timer);
    }else if(isError){
      text = `Error al registrar los datos:\n  ${error.message}`;
      type = "ERROR";
    }

    if(isSuccess||isError){
      showToast(text, type);//muestra el mensaje segun la respuesta  
    }
  },[isSuccess, isError]);

  useEffect(()=>{
    //Muestra un error si el id producto a actualizar no es correcto
    if(typeForm===2){
      if(upIsError){
        //txt = `Error: ${upError.message}`;
        showToast(`Error al cargar los datos:\n ${upError.message}`,"ERROR");
      }
    }
  },[upIsError]);
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSend)} onChange={detectChanges}>        
        <div className={contain_fields}>
          <div className={contain_inputs}>
            <InputField label="Nombre: " name="nombre" register={register} errors={errors}
              validates={{required:"Obligatorio*", maxLength:{value:30, message:"Maximo 30 caracteres"},
              minLength:{value:10, message:"Minimo 10 caracteres"}}} isDisabled={upIsPending}
              classStyles={{classContainField:"field-register-v2", clsInput:"input-height-medium-v2", clsLabel:"lbl-product"}}/>
            
            <InputField label="Stock: " name="stock" register={register} errors={errors} type='number'
              validates={{required:"Obligatorio*", min:{value:1, message:"Minimo es 1"},
              max:{value:50, message:"Maximo es 50"}}} isDisabled={upIsPending}
              classStyles={{classContainField:"field-register-v2", clsInput:"input-height-medium-v2", clsLabel:"lbl-product"}}/>

            <InputField label="Precio: " name="precio" register={register} errors={errors} type='number'
              validates={{required:"Obligatorio*", min:{value:0.1, message:"Minimo es 0.10"},
              max:{value:200, message:"El maximo es 200"}}} isDisabled={upIsPending}
              classStyles={{classContainField:"field-register-v2", clsInput:"input-height-medium-v2", clsLabel:"lbl-product"}}
              step={"0.1"} min={"0.1"}/>
            
            <div className={typeForm===2?contain_buttons:""}>
              {
                typeForm===1?(
                  <div>
                    <button type='submit' className='btn-submit-v2' disabled={isPending}>Registrar</button>
                    <span className='loader'></span>
                  </div>
                ):(<>
                  <div className='div-btn-mdl'>
                    <button type='submit' ref={refBtn} disabled={true||upIsPending||isPending} className="style-btn-1-v3">
                      Actualizar
                    </button>
                    <button type='button' onClick={()=>closeModal(false)} className="style-btn-1-v3">Cerrar</button>
                  </div>
                </>)
              }
            </div>
          </div>
          <div className={contain_selects}>
            <SelectComp data={categorias} isFetching={firstQuery.isFetching} label="Categoria: " name="categoria"
            control={control} validates={{required:"Obligatorio*"}} isError={firstQuery.isError} 
            error={firstQuery.error} detectChange={detectChanges} mxHeight='150px'/>

            <SelectComp data={unidades} isFetching={secondQuery.isFetching} label="Unidad M.: " name="unidad_medida"
            control={control} validates={{required:"Obligatorio*"}} isError={secondQuery.isError}
            error={secondQuery.error} detectChange={detectChanges} mxHeight='150px'/>
          </div>
        </div>
      </form>
    </React.Fragment>
  )
}
