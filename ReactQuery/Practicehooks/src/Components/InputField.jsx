import React from 'react'

export default function InputField({label, name, type="text", register=()=>{}, validates={}, errors={}, watch}) {
  const error = errors[name];
        {/* {(watch(idInpt)||isSubmitted)&&errors[idInpt]?.type==="required"&&
        <div>{errors[idInpt]?.message}</div>}  

      {watch(idInpt)&&errors[idInpt]?.type==="maxLength"&&
      <div>{validates.txtMaxLength}</div>}

      {watch(idInpt)&&errors[idInpt]?.type==="minLength"&&
      <div>{validates.txtMinLength}</div>}

      {watch(idInpt)&&errors[idInpt]?.type==="pattern"&& idInpt==="correo" &&
      <div>No es un correo valido</div>} */}
  return (
    <div className='container-input'>
      <div className='field-register'>
        <label htmlFor={name} className='lbl-register'>{label}</label>
        <input type={type} id={name} className='inpt-register' {...register(name,validates)} />
      </div>
      {watch(name) && error && <div>{error.message}</div>}
    </div>
  )
}
