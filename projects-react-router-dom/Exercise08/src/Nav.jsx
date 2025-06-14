import { NavLink } from "react-router-dom"

export default function Nav({reyes}) {
  const activado = ({isActive})=>{
    return isActive?"activado":null
  }

  const links = reyes.map(x=>{
    const valor = `/${x}`;
    const nombre = x.slice(1, x.length+1);
    const convertido = `${x.charAt(0).toUpperCase()}${nombre}`;

    return <NavLink to={valor} title={x} key={x} className={activado}>{convertido}</NavLink>
  });

  return (
    <nav>
      <NavLink to="/" title="Home" className={activado}>Home</NavLink>
      {
        links
      }

    </nav>
  )
}
