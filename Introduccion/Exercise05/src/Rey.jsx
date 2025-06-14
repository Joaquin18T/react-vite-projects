import './index.css'
export default function Rey({nombre, reinado, vacasComidas}) {
  const urlImg = `https://www.html6.es/img/rey_${nombre.toLowerCase()}.png`;
  return (
    <div className='rey'>
      <div className='texto'>
        <p>
          <span className='nombre-rey'>{nombre.toUpperCase()}</span> ha 
          comido {vacasComidas} vacas en sus {reinado} años de reinado
        </p>
      </div>
      <img src={urlImg} alt="" />
    </div>
  )
}
