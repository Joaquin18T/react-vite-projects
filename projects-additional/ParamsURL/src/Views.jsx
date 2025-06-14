import React from 'react'
import { useState } from 'react'
import {useSearchParams} from 'react-router-dom'
import {parseAsBoolean, parseAsString, useQueryStates} from 'nuqs'

export const Home = ()=>{
  return (
    <>
      <h2>Home</h2>
    </>
  )
}

export const BookShelf = ()=>{
  const [title, setTitle] = useState("");
  //const [search, setSearch] = useSearchParams(); de esto a lo de abajo
  const [search, setSearch] = useQueryStates({
    title:parseAsString,
    isCompleted:parseAsBoolean
  });
  const books = [
    {
      title: 'The Road to Next',
      isCompleted: false,
    },
    {
      title: 'The Road to React',
      isCompleted: true,
    },
  ];

  const handleTitle = (e)=>{
    //setTitle(e.target.value);
    setSearch({title:e.target.value});
  }
  const byTitle = (book)=>{
    const test = book.toLowerCase().includes((search.title||'').toLowerCase());
    //title||'': si title es vacio entonces retornara una cadena vacia, si no retornara title
    //cuando includes(""), siempre retornara true, ya que siempre en una cadena, hay una cadena vacia,
    //es un comportamiento estandar del metodo includes
    return test;
  }

  const bySearch = (book)=>{
    return book.title.toLowerCase().includes((search.title||'').toLowerCase()) &&
    book.isCompleted === Boolean(search.isCompleted)
  } 

  const handleIsComplete = (e)=>{
    setSearch({isCompleted:e.target.checked})
  }
  return (
    <>
      <h2>BookShelf</h2>
      <input type="text"  onChange={handleTitle}/>
      <input type="checkbox" checked={Boolean(search.isCompleted)} onChange={handleIsComplete}/>
      <ul>
        {
          books
          .filter(x=>bySearch(x)) /* Si byTitle retorna true, lo mapeara*/
          .map(({title, isCompleted})=>(
            <li key={title}>{title}</li>
          ))
        }
      </ul>
    </>
  )
}

export const NoMatch = ()=>{
  return (
    <>
      <h2>ERROR 404</h2>
    </>
  )
}
