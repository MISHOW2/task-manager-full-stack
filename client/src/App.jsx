import './App.css'
import axios from 'axios';
import { useState } from 'react';
import TaskForm from './components/TaskForm'
import TaskItem from './components/TaskItems';
import TaskList from './components/TaskList';
import { Route } from 'react-router-dom';
const App = () => {


  return (
    <div>
      <h1>Task Manager</h1>
        <div className="app">
          <div>
            <TaskForm/>
          <a href="">View More tasks</a>
          </div>
          <TaskList/>
        
        </div>
    </div>
  );
};

export default App;
