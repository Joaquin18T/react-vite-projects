import React from 'react'

export default function Button({size, textBtn}) {
  const stylesBtn = {
    md:"w-40 bg-gray-400 p-1 border-2 border-red-300",
    sm:"w-20 bg-gray-400 p-1 border-1 border-red-200"
  }[size];//Forma directa de obtener una prop del objeto
  return (
    <button className={stylesBtn}>
      {textBtn}
    </button>
  )
}
