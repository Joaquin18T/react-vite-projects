import {Contenedor, Titulo, Moverse, Shadow} from './Styles';

export default function Example() {
  return (
    <>
      <Contenedor>
        <Titulo $borde color="red">Caja 1</Titulo>
        <Titulo $borde color="yellow">Caja 2</Titulo>
        <Titulo/>
      </Contenedor>
      <Moverse distancia={100} seg={5}/>
      <Moverse distancia={90} seg={15}/>
      <Moverse distancia={130} seg={10}/>
      <Shadow/>
    </>
  )
}
