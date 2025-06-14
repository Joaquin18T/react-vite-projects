import React from 'react'

export default function Row({person, deletePerson}) {
  const {name, location, phone, picture, login} = person;

  const onDelete = ()=>{
    deletePerson(login.uuid);
  }
  {/*Bandera API? */}
  return (
    <>
      <tr>
        <td><img src={picture.thumbnail}/></td>
        <td>{name.last}</td>
        <td>{name.first}</td>
        <td>{location.city}</td>
        <td>{location.state}</td>
        <td>{location.country}</td> 
        <td>{phone}</td>
        <td><button onClick={onDelete}>Delete</button></td>
      </tr>
    </>
  )
}
