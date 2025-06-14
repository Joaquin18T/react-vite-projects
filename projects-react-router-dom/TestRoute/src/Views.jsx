import { NavLink, Outlet, Link, useParams,useSearchParams } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <h2>Home</h2>
    </>
  );
};

export const Users = ({users}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const valor = searchParams.get("name")||"";

  const handleSearch=(e)=>{
    const name = e.target.value;
    if(name){
      setSearchParams({name:name});
    }else{
      setSearchParams({});
    }
  }
  return (
    <>
      <h2>Users</h2>
      <input type="text" value={valor} onChange={handleSearch}/>
      <ul>
        {
          users
          .filter(x=>(
            x.fullName.toLowerCase().includes(valor.toLowerCase())
          ))
          .map(({id, fullName})=>(
            <li key={id}>
              <Link to={`${id}`}>{fullName}</Link>
            </li>
          ))
        }
      </ul>
      <Outlet/>
    </>
  );
};

export const User = ({onRemoveUser})=>{
  const {iduser} = useParams();
  return(
    <>
      <h2>Id user: {iduser}</h2>
      <button onClick={()=>onRemoveUser(iduser)}>Eliminar</button>
      <Link to={"/users"}>Back</Link>
    </>
  )
}

export const NoMatch = ()=>{
  return(
    <>
      <h2>Error 404 {'><'}</h2>
    </>
  )
}


export const Layout = () => {
  const style = ({isActive})=>({
    fontWeight:isActive?"bold":"normal"
  })
  return(
  <main style={{ color:"#222", backgroundColor:"#4578"}}>
    <nav style={{border:"1px solid"}}>
      <NavLink to={'/users'} style={style}>User</NavLink>
      <NavLink to={'/'} style={style}>Home</NavLink>
    </nav>
    <Outlet/>
  </main>);
};