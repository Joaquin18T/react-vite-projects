import React from 'react'

export default function Button({variant, onClick, text}) {
  return (
    <>
      <button 
      className={variant} 
      onClick={onClick}>
        {text}</button>
    </>
  )
}
