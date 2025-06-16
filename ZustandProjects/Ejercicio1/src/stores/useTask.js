import {create} from 'zustand'
import {persist} from 'zustand/middleware'

//tasks:Propiedad global donde se almacenan todas las tareas
//isUpdate:Propiedad global que evalua si un task se esta actualizando sus datos
//addTask:registra una nueva tarea(1 param Obj)
//deleteTask:Elimina una tarea mediante id(1 param Number)
//upStateTask:Cambia el estado de una tarea a completado (nuevoEstado, idTask)
//upNameTsk:Actualiza el nombre de una tarea (nueva tarea)
//filterTsk:Filtra las tareas por su estado(estado (por defecto es null))
//stateUpChangeTsk:Actualiza el estado de una tarea de si se va a actualizar(idtask, estado de up)
//changeIsUpdate: Actualiza el valor de la propiedad global 'isUpdate'(valor bool)
//cleanAllTasks: Elimina todas las tareas
export const useTask = create(persist((set,get)=>({
  tasks:[],
  isUpdate:false,
  addTask:(newTask)=>{set(
    state=>({
      tasks:[...state.tasks, newTask]})
    )},
  deleteTask:(idTask)=>{set(
    state=>({
      tasks:state.tasks.filter(({id})=>id!==idTask)
    }),
  )},
  upStateTask:(stTask, idTsk)=>{set(
    state=>({
      tasks:state.tasks.map((task)=>{
        if(task.id===idTsk){
          return {...task, state:stTask}
        }else{
          return {...task};
        }
      })
    })
  )},
  upNameTsk:(idTsk, nameTsk)=>{set(state=>({
    tasks:state.tasks.map(task=>{
      if(task.id===idTsk){
        return {...task, name:nameTsk}
      }else return {...task}
    })
  }))},
  filterTsk:(op=null)=>{
    if(op!=null){
      return get().tasks.filter(tsk=>tsk.state===op);
    }
    return get().tasks;
  },
  stateUpChangeTsk:(id,valorUp)=>{set(state=>({
    tasks:state.tasks.map(tsk=>{
      if(tsk.id===id){
        return {...tsk, isUp:valorUp}
      }return {...tsk}
    })
  }))},
  changeIsUpdate:(valor)=>{set({isUpdate:valor})},
  cleanAllTasks:()=>{set({tasks:[]})}
}),{name:"option-tasks"}));

export const stateUpdateTsk = create(persist((set,get)=>({
  isUpdate:false,
  ukState:false,
  task:null,
  changeState:(tsk)=>{set(
    state=>({isUpdate:!state.isUpdate, task:!tsk?null:tsk})
  )},
  updateStateUk:()=>{set(state=>({
    ukState:!state.ukState
  }))}
}),{name:'options-update-task'}));