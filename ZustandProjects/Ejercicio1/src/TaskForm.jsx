import React, { useEffect, useRef, useState } from 'react'
import { stateUpdateTsk, useTask } from './stores/useTask';
import { useShallow } from 'zustand/shallow';
import {v4 as uuidv4} from 'uuid'
import styles from './Stylesf.module.css';

/**
 * Formulario para registrar un nuevo task
 * @returns Renderiza un formulario
 */
export default function TaskForm() {
  const refInput = useRef();
  const {addTask, upNameTsk, isUpdate,changeIsUpdate,tasks, changeStateUpTsk,reset} = useTask(useShallow(state=>({
    addTask:state.addTask,
    upNameTsk:state.upNameTsk,
    isUpdate:state.isUpdate,
    changeIsUpdate:state.changeIsUpdate,
    tasks:state.tasks,
    changeStateUpTsk:state.stateUpChangeTsk,
    reset:state.cleanAllTasks
  })));

  useEffect(()=>{
    //Si un task actualiza su nombre entonces...
    if(isUpdate){
      //console.log(task);
      refInput.current.value = tasks.find(({isUp})=>isUp===true).name; //asigna el nombre del task al input
      refInput.current.focus();//asigna el focus al input
    }
  },[isUpdate]);

  const onSend = (e)=>{
    e.preventDefault();//previene que se envien los datos
    //console.log(e.target[0].value);
    if(e.target[0].value){//Si el input no esta vacio, entonces...
      if(!isUpdate){//si 'isUpdate' es false, entonces se va a registrar un task
        addTask({id:uuidv4(), name:e.target[0].value, state:true,isUp:false});//registrando un nuevo task
        //console.log(uuidv4())
        //setCont(x=>x+1);
      }else{//Si 'isUpdate' es true, entonces es una actualizacion
        const task = tasks.find(({isUp})=>isUp===true);//encuentra al task que se actualiza (a causa de su prop isUp)
        upNameTsk(task.id,e.target[0].value);//actualiza el nombre del task
        changeStateUpTsk(task.id,false);//actualiza la prop 'isUp' a false despues de actualizarse
        changeIsUpdate(false);//actualiza la prop 'isUpdate' 
      }
      e.target[0].value="";//reinicia el input
    }
  }

  //Metodo que cancela la actualizacion
  const cancelUpdate = ()=>{
    if(isUpdate){
      const task = tasks.find(({isUp})=>isUp===true);//encuentra al task que se actualiza (a causa de su prop isUp)
      changeStateUpTsk(task.id,false);//Actualiza la prop 'isUp' del task 
      changeIsUpdate(false);//Actualiza la prop 'isUpdate'
      refInput.current.value="";//reinicia el input
    }
  }
  const sytlesBtn={hover:"border-2 rounded-md p-1 w-20 border-gray-600 bg-gray-600 hover:bg-gray-500"};
  return (
    <div className='flex flex-col'>
      <h2 className='font-bold text-3xl text-center mb-3'>TAILWIND</h2>
      <form onSubmit={onSend} autoComplete='off'>
        <div className='flex items-center justify-center font-semibold'>
          <div className='mr-2'>
            <label htmlFor="task" className='text-lg'>Nueva tarea: </label>
            <input id='task' ref={refInput}
            className='border-2 border-gray-600 rounded-md p-1 focus:outline-none hover:border-gray-400' 
            />
          </div>
          <div className='flex gap-2'>
            <button type='submit' className={sytlesBtn.hover}>
              Enviar
            </button>
            <button onClick={cancelUpdate} className={sytlesBtn.hover}>
              Cancelar
            </button>
            <button onClick={()=>reset()} className={`${styles.button}`}>Reset</button>
          </div>
        </div>
      </form>
    </div>
  )
}
