import {Routes, Route, BrowserRouter as Router, Link} from 'react-router-dom'
import One from '../Components/One'
import Two from '../Components/Two'

export default function MyRouter() {
  return (
    <>
      <Router>
        <div>
          <Link to={'one'}>ONE</Link>
          <Link to={'/two'}>TWO</Link>
        </div>
        <Routes>
          <Route path='one' element={<One/>}/>
          <Route path='/two' element={<Two/>}/>
        </Routes>
      </Router>
    </>
  )
}
