import React from 'react'
import ListItem from './ListItem'

export default function List({data}) {
  return (
    <div>
      {
        data.map((x,i)=>(
          <ListItem key={i} text={x}/>
        ))
      }
    </div>
  )
}
