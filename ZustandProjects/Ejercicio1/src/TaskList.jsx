import React, { useEffect, useState } from 'react'
import TaskItem from './TaskItem'
import { useTask } from './stores/useTask'
import { useShallow } from 'zustand/shallow'

/**
 * Lista de tasks con opciones
 * @returns Renderiza una lista con todas las tasks registradas
 */
export default function TaskList() {
  //Acciones de las tasks (estado global)
  const {tasks,deleteTask, filterTsk} = useTask(useShallow(state=>({
    tasks:state.tasks,
    deleteTask:state.deleteTask,
    filterTsk:state.filterTsk
  })));
  const [filter, setFilter] = useState(null);//Opcion del tipo de filtrado 

  //Metodo que obtiene una opcion del select y filtra los tasks
  const onFilter = (e)=>{
    const op = parseInt(e.target.value);//parsear la opcion
    const valor = op===1?true:op===2?false:null;//Comparar la opcion para obtener un boleano
    setFilter(valor);//Actualiza el state
    console.log(filterTsk(valor));
  }
  return (
    <div className='mt-2'>
      <select onChange={onFilter} 
      className='border-2 p-1 border-gray-700 rounded-md text-white appearance-none focus:outline-none w-40
      hover:border-gray-500'>
        <option value={0} className='text-black'>Todas</option>
        <option value={1} className='text-black'>Pendientes</option>
        <option value={2} className='text-black'>Completadas</option>
      </select>
      <ul className='list-disc'>
        {filterTsk(filter)?.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={() => deleteTask(task.id)}
          />
        ))}
      </ul>
    </div>
  );
}
