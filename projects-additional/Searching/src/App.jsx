import { useContext, useEffect, useRef, useState } from 'react'
import './App.css'
import Row from './Components/Row';
import Contexto from './Context/Contexto';

function App() {
  const {people, setPeople, pos, goDirection, global, setGlobal} = useContext(Contexto);
  const [peopleTemp, setPeopleTemp] = useState([]);
  const [ocultBtn, setOcultBtn] = useState("");
  const [pageLeft, setPageLeft] = useState(0);
  const [pageRight, setPageRight] = useState(2);
  const [btnTest, setBtnTest] = useState();
  
  useEffect(()=>{
    setPeopleTemp(people);
  },[people]);

  const deletePerson =(iduser)=>{
    const copy =people.filter(({login})=>login.uuid!==iduser);
    
    const copyG = [...global];
    const filterGlobal = copyG[pos].filter(({login})=>login.uuid!==iduser);
    copyG[pos] = filterGlobal;

    let tempFirstElement = [];
    let tempCopyG = [...copyG];
    let flag = false;
    for (let i = pos; i < global.length-1; i++) {
      //console.log(global[i+1]);
      const nextList = [...global[i+1]];
      if(nextList.length>0){
        const firstElement = nextList[0];
        const filterNextList = nextList.filter(({login})=>login.uuid!==firstElement.login.uuid);
  
        tempCopyG[i].push(firstElement);
        //console.log("primer elemento", firstElement);
        //console.log("lista next filtrada",filterNextList);
        tempCopyG[i+1] = filterNextList;
  
        //console.log(tempCopyG);
  
        tempCopyG=[...tempCopyG];
  
        if(pos===i && !flag){
          tempFirstElement = firstElement;
          flag=true;
        }

      }
    }
    console.log("nuevo list global", tempCopyG);
    console.log(`elemento cambiado pos: ${pos}`, tempFirstElement);

    setPeople([...copy,tempFirstElement]);
    const filtrarVacio = tempCopyG.filter(x=>x.length>0);
    setGlobal(filtrarVacio);

  }

  const buscarPersona = (e)=>{
    //console.log("texto input", e.target.value);
    const coincidencias = people.filter(({name})=>name.first.includes(e.target.value));
    //console.log(coincidencias);
    setPeopleTemp(coincidencias);
  }

  const orderList = ()=>{
    //El metodo sort modifica el array original
    const list = [...people].sort((a,b)=>{
      if(a.name.first>b.name.first){
        return 1;
      }if(a.name.first<b.name.first){
        return -1;
      }
      return 0;
    });
    //console.log(list);
    setPeople(list);
    //console.log("temp", peopleTemp);
  }

  const goSide = (side)=>{
    const list = goDirection(pos+side);
    //console.log(list);
    console.log("nueva lista", list);
    setPeople(list);
    if(side>0){
      setPageRight(pageRight+1);
      setPageLeft(e=>e+1);
    }else{
      setPageRight(pageRight-1);
      setPageLeft(e=>e-1);
    }
  }

  const desorderList = ()=>{
    const list = [...people].sort((a,b)=>{
      if(a.name.first>b.name.first){
        return -1;
      }if(a.name.first<b.name.first){
        return 1;
      }
      return 0;
    });
    //console.log(list);
    setPeople(list);
  }

  useEffect(()=>{
    if(pos===0){
      setOcultBtn(<></>);
    }else{setOcultBtn(<button onClick={()=>goSide(-1)}>{pageLeft}</button>);}

    if(pos!==global.length-1){
      setBtnTest(<button onClick={()=>goSide(1)}>{pageRight}</button>);
    }if(pos===global.length-1 && pos!==0){
      setBtnTest(<></>);
    }

  },[pos]);


  //Carga fina...
  //Tambien el tr se puede pasar como children a Row...?
  return (
    <div>
      <div className='options-table'>
        <div>
          <label htmlFor="buscar">Busca una persona: </label>
          <input type="text" id='buscar' onChange={(e)=>buscarPersona(e)} placeholder='Nombre Persona'/>
        </div>
        <button onClick={()=>orderList()}>Ordenar (A - Z)</button>
        <button onClick={desorderList}>Desordenar (Z - A)</button>
      </div>

      <table className='tb-people'>
        <thead>
          <tr>
            <th>Photo</th>
            <th>LastName</th>
            <th>Name</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {
          peopleTemp.map((person, i)=>(
            <Row person={person} key={person.login.uuid} deletePerson={deletePerson}/>
          ))
        }
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={8}>
              {ocultBtn}
              {pos!==global.length-1&&
              <button onClick={()=>goSide(1)}>{pageRight}</button>}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default App
