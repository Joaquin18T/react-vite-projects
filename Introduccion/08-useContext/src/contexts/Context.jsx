//Se usara para guardar y obtener valores 
import { createContext,useState } from "react"
export const CreateC = createContext();

//Todos los hijos de App(miran App) podra acceder a las opciones de Datos


//children hace referencia a todos los hijos que tiene datos, si quieres especificar que hijos puede usar
//los datos, se especifica en el argumento

//CreateC.Provider sirve para acceder y modificar los datos

//El value del Provider se usa para guardar y modificar los datos que se pasen desde los componentes

export const Datos = ({children})=>{
  const [color, setColor]= useState("silver"); //silver es el valor inicial que se almacena en el contexto
  return (
    <CreateC.Provider value={{color,setColor}}>
      {children}
    </CreateC.Provider>
  )
}

