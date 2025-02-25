import React from 'react'
import TaskList from '../components/TaskList'
import TaskForm from "../components/TaskForm";
import '../App.css'
function Home() {
  return (
   <>
      <h1>Task Manager</h1>
    <div className='app'>
      <TaskForm/>
      <TaskList/>
    </div>
   </>
  )
}

export default Home
