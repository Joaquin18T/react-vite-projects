import React, { useEffect, useState } from 'react'
import { stateUpdateTsk, useTask } from './stores/useTask';
import { useShallow } from 'zustand/shallow';
import styles from './Stylesf.module.css';

/**
 * Elemento task
 * @param {*} param0 {task:un task de la lista del estado global, onDelete:funcion que elimina un task} 
 * @returns Renderiza un item task con sus opciones
 */
export default function TaskItem({task, onDelete}) {
  const {upStateTsk,changeStateUpTsk,changeIsUpdate, isUpdate}=useTask(useShallow(state=>({
    upStateTsk:state.upStateTask,
    changeStateUpTsk:state.stateUpChangeTsk,
    changeIsUpdate:state.changeIsUpdate,
    isUpdate:state.isUpdate
  })));

  const {name, state, id,isUp} = task; //desestructuracion de un task

  //Metodo que avisa al estado global que un task se va a actualizar
  const onUpdate = ()=>{
    if(!isUpdate){
      changeIsUpdate(true);//cambia la prop global 'isUpdate' a true
      changeStateUpTsk(id, true);// cambia la prop 'isUp' del task a true
    }
  }
  //Cambia el estado del task a completado
  const changeState = ()=>{
    upStateTsk(!state, id);//actualiza el estado del task
  }
  const styleBtn = {
    md:"border-2 p-1 rounded-md border-gray-600 bg-gray-600 hover:bg-gray-500"
  };
  return (
    <div className='task-contain-item font-semibold mt-2 w-full'>
      <li>{name}</li>
      <button onClick={onDelete} disabled={isUp} className={`${styleBtn.md} w-25`}>Eliminar</button>
      <button onClick={onUpdate} disabled={isUp} className={`${styleBtn.md} w-15`}>✏️</button>
      <button disabled={!state||isUp} onClick={changeState} className={`${styleBtn.md} pl-2 pr-2`}>
        Tarea completada
      </button>
      <span>{state?'❌':'✅'}</span>
    </div>
  )
}
