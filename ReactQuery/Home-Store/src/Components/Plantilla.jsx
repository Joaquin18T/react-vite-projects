import {useForm} from 'react-hook-form';//libreria de manejar formularios en react
import InputField from './InputField'; //Componente reutilizable de inputs para un form
import { useEffect, useRef, useState } from 'react'; //hooks nativos de React
import Pagination from './Pagination';
import { ask, showToast } from './SweetCustom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ModalC from './ModalC';
import UpElements from './UpElements';

export default function Plantilla() {
  //const {url, queryKey,typeMutate, paramsQuery,httpMethod="POST"} = paramsMutation;
  const [idElement, setIdElement] = useState();//id del producto a actualizar
  const [titulo, setTitulo] = useState("categoria");//titulo del elemento (categoria/unidad)
  const [tipo, setTipo] = useState("categoria");//tipo de elemento (categoria/unidad)
  const [btnLeft, setBtnLeft] = useState(false);//estado del boton izquierdo
  const [btnRight, setBtnRight] = useState(false);//estado del boton derecho
  const [isOpen, setIsOpen] = useState(false);//estado del modal

  /**
   * Asigna el nombre del elemento pasado por parametro segun el tipo
   * @param {*} unidad Elemento para la unidad
   * @param {*} categoria Elemento para la categoria
   * @returns el nombre pasado por parametro segun el elemento
   */
  const renameType = (unidad="unidad_medida", categoria="categoria")=>{
    return tipo==="unidad-medida"?unidad:categoria;
  }

  //const query = useQueryClient();
  //Obtiene los datos de categorias y unidades segun  el tipo
  const {data,isSuccess, mutate,isPending, isError, error}  = useMutation({
    mutationFn: async({name, params})=>{
      const resp = await fetch(`http://192.168.1.38/home-store/api/${name}.api.php?${params}`);
      if(!resp.ok){
        throw new Error("Hubo un error");
      }
      //console.log(params);
      return resp.json();
    },
    // onSuccess:()=>{query.invalidateQueries([name])}
  });
  
  //La segunda declaracion del hook personalizado es para registrar un nuevo dato.
  const {isPending:isPendingAdd, isError:isErrorAdd, error:errorAdd, isSuccess:isSuccessAdd, mutate:mutateAdd} = 
  useMutation({
    mutationFn:async({name, params})=>{
      const resp = await fetch(`http://192.168.1.38/home-store/api/${name}.api.php`,{
        method:'POST',
        body:JSON.stringify(params)
      });
      const tried = await resp.json();
      //console.log(params);
      console.log(tried);
      return tried;
    }
  });

  //Obtiene un registro por el nombre de un elemento para verificar si existe
  const {isSuccess:exIsSuccess, data:exData, mutate:exMutate, isError:exIsError, error:exError} = useMutation({
    mutationFn:async({name, params})=>{
      const resp = await fetch(`http://192.168.1.38/home-store/api/${name}.api.php?${params}`);
      if(!resp.ok){
        throw new Error("Hubo un error");
      }
      //console.log(params);
      return resp.json();
    }
  });
  

  const [element, setElement] = useState("");//estado usado para el filtrado de datos.

  //El mode 'onChange' valida mientras el usuario escribe. En este caso ya no se usa watch.
  const {handleSubmit, register, reset, watch, formState:{errors}, clearErrors} = useForm({mode:"onChange"}); //declaracion del useForm
  const [dataForm, setDataForm] = useState(); //estado usado para mostrar un mensaje
  const [page, setPage] = useState(1); //estado para el manejo de la paginacion.
  const [filtrado, setFiltrado] = useState([]);//estado para el filtrado de datos

  /**
   * Metodo usado para obtener los valores del form
   * @param {*} data datos del formulario
   */
  const onSend = (data)=>{
    //console.log(data);
    setDataForm(data);//actualiza el estado del form

    const name = tipo==="unidad-medida"?"unidad_medida":"categoria";//cambia el nombre del elemento segun el tipo
    const params = new URLSearchParams();
    params.append(name, data[tipo]);
    exMutate({name:tipo, params:params});//muta para obtener el dato existente segun el nombre
  }

  useEffect(()=>{
    //valida si ya existe el dato
    if(exIsError){
      console.log(exError.message);
    }
    if(exIsSuccess){
      console.log(exData?.valor);
      if(exData?.valor!==0){
        showToast(exData?.valor, "ERROR");
      }else{
        registrarDat();
      }
    }
  },[exIsSuccess, exIsError]);

  /**
   * Registra los datos
   */
  const registrarDat = async()=>{
    if(await ask("¿Estas seguro de registrar?")){
      const valor = tipo==="unidad-medida"?"unidad_medida":"categoria";
      
      console.log(dataForm[tipo]);
      console.log(valor);
      mutateAdd({name:tipo,params:{[valor]:dataForm[tipo]}}); //muta el registro para un nuevo dato
    }
  }

  useEffect(()=>{
    //Si se registra correctamente, entonces entrara en la condicion...
    let text = "";
    let type = "";
    if(isSuccessAdd){
      text = "Se ha registrado correctamente";
      type = "SUCCESS";
      reset();
      
      const name = tipo==="unidad-medida"?"unidad_medida":"categoria";
      mutate({name:tipo, params:pageParams(name)});//Refresca para mostrar el nuevo registro (lo muta)
    }else if(isErrorAdd){
      text = `Hubo un error al registrar: ${errorAdd.message}`;
      type = "ERROR";
    }

    if(isSuccessAdd || isErrorAdd){
      showToast(text, type);
    }
  },[isSuccessAdd, isErrorAdd,]);

  /**
   * metodo que prepara los datos al mutar
   * @param {*} nameElement nombre del elemento (categoria/unidad_medida)
   * @param {*} pagina pagina actual
   * @returns URLSearchParams con los datos preparados para mutar
   */
  const pageParams = (nameElement="categoria", pagina=1)=>{
    const valores = new URLSearchParams();
    valores.append(nameElement, element);
    valores.append("limit", 5);
    valores.append("page", pagina);
    
    return valores;
  }

  /**
   * Refresca los datos de la tabla
   */
  const refreshData = ()=>{
    //La primera vez que se monta el componente y cuando cambia el valor del estado de element.
    const name = tipo==="unidad-medida"?"unidad_medida":"categoria";
    mutate({name:tipo, params:pageParams(name)});
  }
  useEffect(()=>{
    refreshData();

    //console.log(data);
  },[element]); //Conforme se vaya cambiando el valor de 'element', se ejecuta el useEffect

  useEffect(()=>{
    if(isSuccess){
      console.log(data);
      setFiltrado(data?.data);
    }
  },[isSuccess]);//Cuando 'isSuccess' cambie de valor se ejecutara este useEffect. Si es true actualiza el estado

  /**
   * Aumenta o disminuye la paginacion
   * @param {Number} action disminuye(1), aumenta(2) 
   */
  const changePage = (action)=>{
    let op = 0;
    if(action===1){
      op = page-1;
    }else if(action===2){
      op = page + 1;
    }
    setPage(op);
    const name = tipo==="unidad-medida"?"unidad_medida":"categoria";
    mutate({name:tipo, params:pageParams(name,op)});
  }

  /**
   * Filtra los datos segun lo que escribe el usuario.
   * @param {*} e valor que escibre el usario para buscar
   */
  const searchCategoria = (e)=>{
    setElement(e.target.value);//valor escrito por el usuario
    let nuevosDatos = [];

    if(tipo==="categoria"){
      nuevosDatos = data?.data.filter(({categoria})=>categoria.toLowerCase().includes(e.target.value.toLowerCase()));
      //mutate({first:e.target.value.trim().toLowerCase(), second:5, third:page}); 
      console.log(nuevosDatos);
    }
    if(tipo==="unidad-medida"){
      nuevosDatos = data?.data?.filter(({unidad_medida})=>unidad_medida.toLowerCase().includes(e.target.value.toLowerCase()));
      console.log(nuevosDatos);
    }
    setFiltrado(nuevosDatos);//datos filtrados
  }

  useEffect(()=>{
    //restricciones en las paginaciones
    if(isSuccess){
      //console.log(filtrado);
      if(data?.totalData<=5){//deshabilita el boton derecho
        //refNextPage.current.disabled = true;
        setBtnRight(true);
        //Si se cambia de pagina a una posterior, y buscas un dato anterior a esa pagina no lo muestra
        //a causa del offset
      }
      if(data?.totalData>5){//habilita el boton derecho
        setBtnRight(false);
        //console.log(element);
        //refPreviousPage.current.disabled = true;
        //setBtnLeft(true);
      }
    }else if(isError){
      showToast(`Error al buscar: ${error.message}`,"ERROR");
    }
  },[isSuccess, isPending, isError]);
  //Si es true isSuccess y la cantidad de datos es menor o igual 5, entonces deshabilita el boton de nextPage

  /**
   * Obtiene el valor del cambio de elemento
   * @param {*} e valor seleccionado
   */
  const changeOption = (e)=>{
    if(e.target.value){
      const elementSearch = e.target.value==="unidad-medida"?"unidad_medida":"categoria";
      clearErrors(tipo);
      setTipo(e.target.value);
      setPage(1);
      setTitulo(e.target.value==="unidad-medida"?"unidad":"categoria");
      mutate({name:e.target.value, params:pageParams(elementSearch)});
      
    }
  }

  /**
   * Metodo usado para obtener el id del producto a actualizar
   * @param {*} id id del producto a actualizar
   */
  const onUpdateElement = (id)=>{
    setIsOpen(true);
    setIdElement(id);
  }
  
  return (
    <div className='contain-categoria'>
      <h2>REGISTRO DE {titulo.toUpperCase()}</h2>
      <div className="contain-form">
        <form action="" onSubmit={handleSubmit(onSend)}>
          <div className='row-form'>
            <InputField label={`Nueva ${titulo}: `} name={tipo} register={register}
            classStyles={{clsLabel:"lbl-product"}}
            validates={{required:"El campo es obligatorio", 
            maxLength:{value:30, message:"Maximo 30 caracteres"},
            minLength:{value:5, message:"Minimo 5 caracteres"}}} errors={errors}
            />

            <select id='select_option'onChange={changeOption}>
              <option value={"categoria"}>Categoria</option>
              <option value={"unidad-medida"}>Unidad Medida</option>
            </select>
          </div>
          <button type='submit' disabled={isPendingAdd} className='btn-submit'>Guardar</button>
        </form>
        {/* {isPendingAdd&&<span className='loader'></span>} */}
        {/* {showText&&<span>Se ha registrado correctamente</span>}
        {isErrorAdd&&<span>Error: {errorAdd.message}</span>} */}
      </div>
      {/* <hr className='line-hr'/> */}
      <div className='contain-search-and-table'>
        <div className='contain-search'>
          <label className='lbl-product'>Buscar {titulo}: </label>
          <input type='text' onChange={(e)=>searchCategoria(e)} className='inpt-search'/>
        </div>
        <div className='contain-table-plantilla'>
          {isPending&&<div className='loader'></div>}
          {isSuccess&&
          <table className='table-categoria'>
            <thead>
              <tr className='height-tr-table'>
                <th className='width-th'>#</th>
                <th className='widthv2-th'>{titulo.toUpperCase()}</th>
                <th className=''>Accion</th>
              </tr>
            </thead>
            <tbody>
              {
                tipo==="categoria"&&data.totalData>0&&(
                  filtrado?.map(({idcategoria, categoria},i)=>(
                    <tr key={`${idcategoria}-${i}`} className='height-tr-table'>
                      <td className='center-text-table'>{idcategoria}</td>
                      <td>{categoria}</td>
                      <td>
                        <button onClick={()=>{onUpdateElement(parseInt(idcategoria))}} className="style-btn-1-v2">
                          Actualizar
                        </button>
                      </td>
                    </tr>
                  ))
                )
              }
              {
                tipo==="unidad-medida"&&data.totalData>0&&(
                  filtrado?.map(({idunidad_medida, unidad_medida},i)=>(
                    <tr key={`${idunidad_medida}-${i}`} className='height-tr-table'>
                      <td className='center-text-table'>{idunidad_medida}</td>
                      <td>{unidad_medida}</td>
                      <td><button onClick={()=>{onUpdateElement(parseInt(idunidad_medida))}}>Actualizar</button></td>

                    </tr>
                  ))
                )
              }
              {data.totalData===0&&
                <tr>
                  <td colSpan={2}>Sin resultados</td>
                </tr>
              }
            </tbody>
            <Pagination page={page} onPage={changePage} totalPages={data?.totalPages} spanCol={3}
              direction={{left:1, right:2}} refs={{refLeft:btnLeft, refRight:btnRight}}
              styles={{styleBtnLft:"btn-page-table margin-end-7", styleBtnRgt:"btn-page-table"}}
            />
          </table>}
        </div>
        {isError&& <span>{error.message}</span>}
      </div>
      <ModalC modalIsOpen={isOpen} setModalIsOpen={setIsOpen} width={"400px"}>
        <UpElements name={tipo} lblInput={renameType("Unidad M.", "Categoria")}
        nameInput={renameType()} idKey={renameType("idunidad_medida", "idcategoria")}
        idValue={idElement} setCloseModal={setIsOpen} refresh={refreshData}/>
      </ModalC>
    </div>
  )
}
