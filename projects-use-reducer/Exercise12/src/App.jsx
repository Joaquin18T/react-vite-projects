
import './App.css'
import { Provider } from './Context/Provider';
import Game from './Game';
import Ruta from './Routes/Ruta';

function App() {

  return (
    <>
      <Provider>
        <Ruta/>
      </Provider>
    </>
  )
}

export default App
