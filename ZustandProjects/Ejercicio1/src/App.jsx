import './App.css'
import TaskForm from './TaskForm';
import TaskList from './TaskList';

function App() {

  return (
    <div className='flex items-center justify-center  border-2 border-gray-400 w-5/10 mt-2 rounded-md'>
      <div className='flex flex-col justify-center'>
        <TaskForm/>
        <TaskList/>
      </div>
    </div>
  )
}

export default App
