import { useState, useEffect } from "react";
import { getTasks } from "../api/taskAPI";
import '../styles/taskList.css'
const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();
      setTasks(data);
    };

    // Show loading for exactly 5 seconds before fetching data
    const timeout = setTimeout(() => {
      fetchTasks();
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timeout); // Cleanup on unmount
  }, []);

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div className="task-list">
      
      <h2>Task List</h2>
     
      <ul className="task-list-items">
        {tasks.map((task) => (
      
          <li className="task-item" key={task.id}>
            <h3 className="task-title"><span>Title: </span>{task.title}</h3>
            <p className="task-description">{task.description}</p>
            <p className="task-status">{task.title} - {task.completed ? '✅ Completed' : '❌Not yet completed'}</p>
            
          </li>
        ))}

      </ul>
     
    </div>
  );
};

export default TaskList;
