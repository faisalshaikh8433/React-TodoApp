import React from 'react';
import '../css/TodoForm.css';


const TodoForm = (props) => {
  return(
    <form onSubmit={props.addCurrentTask}>
      <label>TODO</label>

      <input type='text' onChange={props.updateCurrentTask} value={props.currentTask}/>

      <button className='addbtn' type='submit'>ADD</button>
    </form>
  )
}

export default TodoForm;