import { Link } from "react-router-dom";

export function Page3(){
  return(
    <>
      <p>Page 3</p>
      {/*Link te manda a otro enlace*/}
      <Link to="/page2">To page 2</Link>
    </>
  )
}