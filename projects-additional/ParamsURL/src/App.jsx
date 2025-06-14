import { useState } from 'react'
import {Link, Route, Routes} from 'react-router-dom'
import { BookShelf, Home, NoMatch } from './Views'
//import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>React Router</h1>
      <nav>
        <Link to={'/'}>Home</Link>
        <Link to={'/bookshelf'}>BookShelf</Link>
      </nav>

      <Routes>
        <Route index element={<Home/>}/>
        <Route path='bookshelf' element={<BookShelf/>}/>
        <Route path='*' element={<NoMatch/>}/>
      </Routes>
    </>
  )
}

export default App
