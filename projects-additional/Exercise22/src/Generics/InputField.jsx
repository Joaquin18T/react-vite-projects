import React from 'react'

export default function InputField({forId,children, typeInput='text'}) {
  return (
    <>
      <label htmlFor={forId}>{children}</label>
      <input id={forId} type={typeInput}/>
    </>
  )
}
