import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Notes from './components/Notes'

function App() {
  // {
  //   id: uuidv4(),
  //   task: 'Do laundry'
  // }
  const [notes, setNotes] = useState([{id: uuidv4(), task: 'Do laundry'}]);
  const addNote =()=>{
    const newNote = {   
      id: uuidv4(),
      task: 'Learn React'
    };
    setNotes((e)=>{[...e, newNote]});
    console.log(notes);
    
  }

  const deleteNote=(id,e)=>{
    e.stopPropagation();
    setNotes(notes.filter(note=>note.id!==id));
  }

  
  return (
    <div>
      <button onClick={()=>{addNote}}>+</button>
      <Notes notes={notes} onDelete={deleteNote}/>
    </div>
  )
}

export default App
