import { Navigate, Route, Routes } from "react-router-dom";
import Content1 from "../pages/Content1";
import Content2 from "../pages/Content2";
import Content3 from "../pages/Content3";
import Navbar from "../Navbar";

export default function Router2() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="contenido1" element={<Content1/>}/>
        <Route path="contenido2" element={<Content2/>}/>
        <Route path="contenido3" element={<Content3/>}/>
        <Route path="/" element={<Navigate to={"contenido1"} replace/>}/>
        {/*replace en navigate reemplaza la ruta y asi no se puede volver atras */}
      </Routes>
    </>
  )
}
