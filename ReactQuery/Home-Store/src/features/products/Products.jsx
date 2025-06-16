
import { useEffect, useRef, useState } from "react";
import Pagination from "../../Components/Pagination";
import SelectFilter from "../../Components/SelectFilter";
import ModalC from "../../Components/ModalC";
import UpdateProd from "../../Components/UpdateProd";
import FormProd from "../../Components/FormProd";
import ChangeState from "../../Components/ChangeState";
import { showToast } from '../../Components/SweetCustom';
import useMutate from '../../hooks/useMutate';
import GetElements from '../../Components/GetElements';

/**
 * Componente que gestiona los productos
 * @returns Formulario y tabla de productos
 */
export default function Products() {
  const [categorias, setCategoria] = useState([]);//Almacena todas las categorias
  const [unidadMedida, setUnidadMedida] = useState([]);//Almacena todas las unidades de medida

  //Aca se obtiene los datos de categorias y unidades de medida
  const {firstQuery, secondQuery} = GetElements({firstUrl:"http://192.168.1.38/home-store/api/categoria.api.php", 
    firstQueryKey:"categoria", secondUrl:"http://192.168.1.38/home-store/api/unidad-medida.api.php", secondQueryKey:"unidad"});

  const [producto, setProducto] = useState("");//estado para filtrar los productos por el nombre
  const [idCategoria, setIdCategoria] = useState(0);//estado que almacena el idcategoria
  const [idUnidad_medida, setIdUnidadMedida]=useState(0);//estado que alamcena la idunidad
  const [page, setPage] = useState(1);//estado para la paginacion
  const [btnLeft, setBtnLeft] = useState(false);//deshabilita y habilita el boton de la paginacion (izquierda)
  const [btnRight, setBtnRight] = useState(false);//deshabilita y habilita el boton de la paginacion (derecha)
  const [valueCat, setValueCat] = useState();//estado que guarda el valor elegido del select de categorias
  const [valueUM, setValueUM] = useState();//estado que guarda el valor elegido del select de unidades M.
  const [isOpenUp, setIsOpenUp] = useState(false);//estado que determina si el modal se abre o se cierra

  const [idProduct, setIdProduct] = useState();//estado donde se guarda el id del prod para actualizarlo

  /**
   * Refresca la tabla de productos
   */
  const refreshTable = ()=>{
    const params = new URLSearchParams();
    params.append("nombre", producto);
    params.append("idcategoria", idCategoria===0?"":idCategoria);
    params.append("idunidad_medida", idUnidad_medida===0?"":idUnidad_medida);
    params.append("limit", 5);
    params.append("page", page);

    mutate(params);
  }
  //Filtrado y paginacion de la tabla
  const {data, isPending, isError, error, isSuccess, mutate} = 
  useMutate({url:"http://192.168.1.38/home-store/api/product.api.php", method:"GET", query:"paginateProd",typeQuery:2});
  useEffect(()=>{
    refreshTable();
  },[page, producto, idCategoria, idUnidad_medida]);

  //Metodo que se ejecuta cada vez que el input cambia su valor(onChange)
  const changeTextProduct =(e)=>{
    console.log("Valor filtro: ",e.target.value);
    setProducto(e.target.value);//asigna el nombre al estado
    //filterProduct();
  }

  /**
   * Estructura los datos para que se muestren en los selects
   * @param {Array} data lista de datos (objetos) 
   * @param {*} id valor de la opcion
   * @param {*} text texto de la opcion
   * @returns un arrays de objetos
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
    let copyCategoria = [];
    let copyUnidad = [];

    if(firstQuery.isSuccess && secondQuery.isSuccess){
      copyCategoria = optionsSelect(firstQuery.data, "idcategoria", "categoria");
      copyUnidad = optionsSelect(secondQuery.data, "idunidad_medida", "unidad_medida");
    }
    //let copyUnidad = optionsSelect
    //se almacena los datos en el estado
    setCategoria(copyCategoria);
    setUnidadMedida(copyUnidad);
  },[firstQuery.isSuccess, secondQuery.isSuccess]);

  /**
   * Metodo que determina si se pasa al siguiente o anterior pagina de la tabla
   * @param {*} type izquierda (1), derecha (2)
   */
  const onPage = (type)=>{
    let op = 0;
    if(type===1){
      op = page - 1;
    }else if(type===2){
      op = page + 1;
    };
    setPage(op);
  }

  //Obtiene la opcion del select de categorias cada vez que se cambie
  const getCategoria = (e)=>{
    setValueCat(e);//este estado asigna la opcion a la caja del select
    console.log(e);
    setIdCategoria(e?.value==null?"":e.value);//asigna el id/valor de la opcion al estado
  }
  //Obtiene la opcion del select de unidades cada vez que se cambie
  const getUnidadM = (e)=>{
    setValueUM(e);//este estado asigna la opcion a la caja del select
    setIdUnidadMedida(e?.value==null?"":e.value);//asigna el id/valor de la opcion al estado
    console.log(e);
  }

  //reinicia el filtrado
  const resetFilter=()=>{
    setIdCategoria(0);
    setIdUnidadMedida(0);
    setValueCat("");
    setValueUM("");
  }

  useEffect(()=>{
    //Deshabilita o habilita los botones de la paginacion
    if(isSuccess){
      //console.log("Exist", data?.totalData);
      if(data.totalData<5){
        //refBtnRight.current.disabled = true;
        setBtnRight(true);
      }
      if(data.totalData>5){
        //refBtnRight.current.disabled = false;
        setBtnRight(false);
      }
    }else if(isError){
      showToast(`Error al buscar: ${error.message}`, "ERROR");
      //console.log(error.message);
    }
  },[isSuccess,isPending, isError]);//Es necesario el isFeching

  //metodo que abre el modal para actualizar los datos de un producto
  const openModal = (id)=>{
    setIdProduct(parseInt(id));//el id del producto a actualizar
    setIsOpenUp(true);//abre el modal
  }
  return (
    <div className="contain-main-product">
      <h2>REGISTRO DE PRODUCTOS</h2>
      <div className='contain-form-v2'>
        <FormProd defaultV={{nombre:'', stock:'', precio:'', categoria:null, unidad_medida:null}} typeForm={1}
        httpMethod="POST" filterProduct={refreshTable} nameClasses={{contain_fields:"contain-fields-v2", 
          contain_inputs:"", contain_buttons:"", contain_selects:"select-block-v2"
        }}/>
      </div>
      <hr/>
      <div className="second-block-product">
        <div className="contain-filter-table-v2">
          <div className="field-filter-v2">
            <label htmlFor="producto" className="lbl-product">Producto: </label>
            <input type="text" id="producto" onChange={(e)=>changeTextProduct(e)} className="size-text-medium-v2"/>
          </div>
          <SelectFilter data={categorias} name="categoria" label="Categorias" isDisabled={firstQuery.isFetching}
          fnOnChange={getCategoria} value={valueCat}/>
          <SelectFilter data={unidadMedida} name="unidad_medida" label="Unidad M." isDisabled={secondQuery.isFetching}
          fnOnChange={getUnidadM} value={valueUM}/>
          <div className="contain-btn-reset-v2">
            <button onClick={resetFilter} className="btn-style-filter">Reiniciar</button>
          </div>
        </div>
        <div className="">
          {isError&&<span>{error.message}</span>}
          {isPending?
          (<div className="loader"></div>):(
          <table className='table-categoria-v2'>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Categoria</th>
                <th>Unidad M.</th>
                <th>Stock</th>
                <th>Precio</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.length?(
                data.data.map(({idproducto, nombre, categoria, unidad_medida, stock, precio, estado})=>(
                  <tr key={idproducto}>
                    <td>{idproducto}</td>
                    <td>{nombre}</td>
                    <td>{categoria}</td>
                    <td>{unidad_medida}</td>
                    <td>{stock}</td>
                    <td>{precio}</td>
                    <td>{estado===1?"Disponible":"No Disponible"}</td>
                    <td>
                      <div className="div-modals-v2">
                        <button onClick={()=>openModal(idproducto)} className="style-btn-1-v2" disabled={estado===0}>
                          Actualizar
                        </button>
                        {/* <button className="style-btn-1" onClick={()=>openMEstado(idproducto, estado)}>Estado</button> */}
                        <ChangeState idproducto={parseInt(idproducto)} estado={parseInt(estado)} refresh={refreshTable}/>
                      </div>
                    </td>
                  </tr>
                ))
                ):(
                  <tr>
                    <td colSpan={8} style={{textAlign:"center"}}>No hay resultados</td>
                  </tr>
                )
              }
            </tbody>
            <Pagination page={page} onPage={onPage} totalPages={data?.totalPages} spanCol={8}
              styles={{stylesTd:{textAlign:"right"}, styleBtnLft:"btn-page-table margin-end-7",
              styleBtnRgt:"btn-page-table"}}
              direction={{left:1, right:2}} refs={{refLeft:btnLeft, refRight:btnRight}}
            />
          </table>)}
        </div>
      </div>
      <ModalC modalIsOpen={isOpenUp} setModalIsOpen={setIsOpenUp} width="70vw" children={
        <UpdateProd idproducto={idProduct}refresh={refreshTable} closeModal={setIsOpenUp}/>
      }/>
    </div>
  )
}
