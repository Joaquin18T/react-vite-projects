import React from 'react'

/**
 * Componente reutilizable de inputs para formularios
 * @param {*} param0 Objeto con props definidas: (label:Texto que se mostrara en el label) - (name:Id del input como el for del
 * label) - (type:Tipo del input, por defecto es text) - (register:Funcion del hook useForm para gestionarlo) - (validates: 
 * Validaciones para el input) - (error:Errores que del input, del useForm) - (value:Opcional. Valor por defecto del input) - (
 * classStyles: estilos del componente (classContainField: contenedor del input, clsInput: input, clsLabel:label)) - (step: 
 * Opcional. Valor en cuanto aumentara el input cuando su tipo es number. Por defecto es 1) - (min:Valor minimo del input usado con el
 * tipo number, por defecto es 0) - (isDisabled:Opcional. Deshabilitar el input, por defecto es false)
 * @returns 
 */
export default function InputField({label, name, type="text", register=()=>{}, validates={}, errors={}, value, classStyles={}, step=1, min=0, 
  isDisabled=false}) {
  const {classContainField, clsInput = "input-height-small", clsLabel} = classStyles;//desestructurar estilos
  const error = errors[name];//esto es igual a errors.IdField
  
  //error && <div>{error.message}</div>:'error' valida que se cumpla con las validaciones del campo(idField).
  //Si no se cumple(true), entonces muestra el error. Si cumple las validaciones(false), no mostrara el mensaje
  return (
    <div className='container-input-design'>
      <div className={classContainField}>
        <label htmlFor={name} className={clsLabel}>{label}</label>
        <input type={type} id={name} value={value} className={clsInput} {...register(name,validates)} step={step} min={min} 
        disabled={isDisabled}/>
      </div>
      {error && <div>{error.message}</div>}
      {/* {watch(name) && error && <div className='message-alert'>{error.message}</div>} */}
    </div>
  )
}
