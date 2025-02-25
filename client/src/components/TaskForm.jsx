import React, { useState } from 'react';
import { createTask } from '../api/taskAPI';
import { Link,Route } from 'react-router-dom';
import '../styles/form.css'
const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = { title, description, completed };
    
    try {
      await createTask(newTask);
      alert('Task added successfully!');
    
      
    } catch (error) {
      alert('Error adding task!');
    }
  };

  return (
  <>
          <form onSubmit={handleSubmit} >
      <h3>Add Task</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <label>
        Completed:
        <input
          type="checkbox"
          checked={completed}
          onChange={() => setCompleted(!completed)}
        />
      </label>
      <button type="submit">Add Task</button>

    </form>

    

  </>

    
  );
};

export default TaskForm;
