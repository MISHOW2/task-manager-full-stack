import { useState, useEffect } from "react";
import { getTasks } from "../api/taskAPI";
import { Link } from "react-router-dom";
import "../styles/taskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();
      setTasks(data);
    };

    setTimeout(() => {
      fetchTasks();
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <p>Loading tasks...</p>;

  if (tasks.length === 0) {
    return <p>No data found.</p>; // Display message when no tasks are found
  }

  return (
    <div className="task-list">
      <h2>Task List</h2>
      <ul className="task-list-items">
        {tasks.map((task) => (
          <li className="task-item" key={task.id}>
            <Link to={`/task/${task.id}`} className="task-link">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p className={task.completed ? "status completed" : "status pending"}>
                {task.completed ? "✅ Completed" : "❌ Pending"}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
