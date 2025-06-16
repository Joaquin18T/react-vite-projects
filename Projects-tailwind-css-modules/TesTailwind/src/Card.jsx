import React from 'react'

export default function Card({title, content, variant, onAction}) {
  const styleCard = {
    primary:"border-blue-500 bg-blue-200",
    secondary:"border-gray-500 bg-gray-200",
    danger:"border-red-500 bg-red-200",
  }[variant];
  return (
    <div className={`flex justify-center items-center border-2 rounded-md max-w-50 flex-col text-gray-500 ${styleCard}`} 
      onClick={()=>onAction()}>
      <h3 className='text-xl font-semibold'>{title}</h3>
      <p className='text-center'>{content}</p>
    </div>
  )
}
