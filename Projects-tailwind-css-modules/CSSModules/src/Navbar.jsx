import style from './modulesCSS/navbar.module.css';
export default function Navbar() {
  const {bar_navigate, link} = style;
  return (
    <nav className={bar_navigate}>
      <a href="#" className={link}>Inicio</a>
      <a href="#" className={link}>Servicio</a>
      <a href="#" className={link}>Contacto</a>
    </nav>
  )
}
