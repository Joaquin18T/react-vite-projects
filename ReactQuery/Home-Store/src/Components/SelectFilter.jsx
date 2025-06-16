import Select from 'react-select'

/**
 * Componente reutilizable Select
 * @param {*} param0 objeto con props definidas:(name:idenft. del select)-(label:texto que acompaña al select)-(
 * data:opciones del select(array de objetos))-(value: valor por defecto)-(fnOnChange:seguimiento de las
 * opciones que elige el usuario)
 * @returns renderiza un Select
 */
export default function SelectFilter({name, label, data, isDisabled, value, fnOnChange=()=>{}}) {
  const customStyles = {
    control:(provided)=>({
      ...provided,
      width:"110%",
      minWidth: "180px",
      backgroundColor: '#f0f0f0',
      borderColor: '#ccc',
      boxShadow: 'none',
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
    }),
    menu:(provided)=>({
      ...provided,
      width:"100%",
      borderRadius: '8px',
      marginTop: '5px',
    }),
    singleValue:(base)=>({
      ...base,
      color:"#222"
    }),
    menuList:(provided)=>({
      ...provided,
      maxHeight:"150px",
      overflowY:"auto",
      borderRadius:"8px"
    })
  };
  const nuevoData = [...data,{ value: "", label: "Selecciona" }];
  return (
    <div className='contain-select-filter'>
      <label className='lbl-product'>{`${label}: `}</label>
      <Select
      name={name}
      options={data}
      value={value}
      styles={customStyles}
      isDisabled={isDisabled}
      onChange={fnOnChange}
      isClearable/>
    </div>
  )
}
