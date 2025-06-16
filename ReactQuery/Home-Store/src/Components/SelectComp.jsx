import Select from 'react-select'
import { Controller } from 'react-hook-form';

/**
 * Componente select reutilizable (libreria) 
 * @param {*} param0 Objeto con props definidas: (data:lista de opciones(array de objetos))-(isFetching:deshabilitar hasta que 
 * carguen los datos)-(label:label del select)-(name:nombre al select)-(control:control para validaciones)-(validate:validaciones)-(isError:booleamo
 * de si hay un error)-(error: mensaje de error)-(detectChanges:obtenes el valor cada vez que cambia de opcion)
 * @returns renderiza un select personalizado
 */
export default function SelectComp({data, isFetching, label, name, control, validates={}, isError, error, detectChange=()=>{}}) {
  //Propiedades de customStyles para dar estilos al Select
  //P. control: estiliza el contenedor principal del select(El elemento en si).
  //P. option: personaliza cada opcion del select.
  //P. menu: personaliza el contenedor que se despliega al seleccionar el select
  //P. menuList: personaliza la lista de opciones del select
  //P. singleValue:personaliza el texto cuando se selecciona un elemento del select

  //los parametros de cada funcion en las propiedades, representa los estilos base de la libreria
  //Asi no se pierde ningun estilo
  const customStyles = {
    control:(provided)=>({
      ...provided,
      width:"100%",
      minWidth: "200px",
      backgroundColor: '#f0f0f0',
      borderColor: '#ccc',
      boxShadow: 'none',
      height: "40px",
      minHeight: "40px",
      fontSize:"16px",
      '&:hover': {
        borderColor: '#888',
      },
    }),
    option:(base, {isFocused, isSelected})=>({
      ...base,
      backgroundColor: isSelected ? '#4caf50' : isFocused ? '#e8f5e9' : '#fff',
      color: isSelected ? '#fff' : '#333',
      padding: '10px',
      cursor: 'pointer',
      fontSize:"16px",

    }),
    menu:(provided)=>({
      ...provided,
      
      width:"100%",
      borderRadius: '8px',
      // marginTop: '5px',

    }),
    singleValue:(base)=>({
      ...base,
      color:"#222"
    }),
    menuList:(provided)=>({
      ...provided,
      maxHeight:"200px",
      overflowY:"auto",
      borderRadius: '8px',
    })
  };

  //Propiedades del componente Select:
  //options: Representa las opciones del select, se define mediante un array de objetos, donde deben tener como nombre de 
  //propiedad 'value' y 'label'
  //value: como valor se le pasa un estado (useState) para obtener el valor seleccionado.
  //onChange: como valor se le pasa una funcion que se ejecuta cada vez que se selecciona una opcion 
  //(como parametro en la funcion se obtiene el objeto de la opcion seleccionada)

  return (
    <div className="contain-select-v2">
      <label className='lbl-product'>{label}</label>
      <Controller 
        name={name}
        control={control}
        rules={validates}
        render={({field, fieldState:{error}})=>(
          <>
            <Select {...field} 
            options={data} 
            styles={customStyles}
            defaultValue={null}
            isDisabled={isFetching}
            menuPortalTarget={document.body}
            onChange={(selected)=>{
              field.onChange(selected);
              detectChange();
            }}/>
            {error && <span>{error.message}</span>}
          </>
        )}
      />
      {isError&&<span>{error.message}</span>}
    </div>
  )
}
