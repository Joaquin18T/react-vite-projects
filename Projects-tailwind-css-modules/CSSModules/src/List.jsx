import React from 'react'
import style from './modulesCSS/task.module.css';

export default function List() {
  const {contain_list, complete,item} = style;
  const items = [{task:"clean the room", state:false},{task:"Do Homework", state:true},{task:"Eat foods", state:false}];
  return (
    <div>
      <ul className={contain_list}>
        {
          items.map(({task, state})=>(
            <li key={task} className={`${state?complete:''} ${item}`}>
              {task} - {state?'✅':'❌'}
            </li>
          ))
        }
      </ul>
    </div>
  )
}
