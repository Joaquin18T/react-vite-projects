import React from 'react'

export default function Layout({dataHeader, children, dataFooter}) {
  return (
    <>
      <header><h2>{dataHeader}</h2></header>
      <main>{children}</main>
      <footer>{dataFooter}</footer>
    </>
  )
}
