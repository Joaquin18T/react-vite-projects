import React, { useEffect, useState } from 'react'
import useApi from './hook/useApi'

export default function Exe2() {
  const [page, setPage] = useState(1);
  const {data, isFetching} = useApi(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`,page, {keepPreviousData:true});

  useEffect(()=>{
    console.log(data);
  },[data]);

  if(isFetching) return (<div>Cargando...</div>);
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {!isFetching&&
            data.map(({id,title, body})=>(
              <tr key={id}>
                <td>{title}</td>
                <td>{body}</td>
              </tr>
            ))
          }
        </tbody>
        <tfoot>
          <tr>
            <td><button disabled={page===1} onClick={()=>{setPage(page-1)}}>{page===1?"-":page-1}</button></td>
            <td><button onClick={()=>{setPage(page+1)}}>{page+1}</button></td>
          </tr>
        </tfoot>
      </table>
    </>
  )
}
