import React from 'react'

export default function ButtonFetch({fetchNextPage, isFetchNextPage, hasNextPage, children}) {
  return (
    <button onClick={()=>fetchNextPage()} disabled={!hasNextPage||isFetchNextPage}>
      {children}
    </button>
  )
}
