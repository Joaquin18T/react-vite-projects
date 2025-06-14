import { useState } from "react";
export function TwitterCard({children,format, userName, initialIsFollow}){
  //const state = useState(false); //valor inicial del estado
  //el estado devuelve un array de dos posiciones
  //pos 1 es el valor del estado
  //const isFollowing = state[0];
  //pos 2 funcion que nos permita actualizar el state
  //const setisFollowing = state[1];

  //Otra manera de inicializar un state
  const [isFollowing,setIsFollowing]= useState(initialIsFollow);

  const imagenSrc = `https://unavatar.io/${userName};`;
  
  const text = isFollowing?'Siguiendo':'Seguir';
  
  const ButtonClassName = isFollowing
    ?'tw-followCard-button is-follow'
    :'tw-followCard-button';

  const handleClick = ()=>{
    setIsFollowing(!isFollowing);
  }

  return(
    <article className="tw-followCard">
      <header className="tw-followCard-header">
        <img 
          //Evaluando el nombre del usuario de forma dinamica
          src={imagenSrc} 
          alt="Avatar discord" 
          className="tw-followCard-image"/>
        <div>
          <strong>{children}</strong>
          <span>{format(userName)}</span>
        </div>
      </header>
      <aside>
        <button className={ButtonClassName} onClick={handleClick}>
          
          <span className="tw-followCard-text">{text}</span>
          <span className="tw-followCard-stopFollow">Dejar de seguir</span>
        </button>
      </aside>
      {/* comentario */}
    </article>
  )
}