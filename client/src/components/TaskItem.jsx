import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTasks, deleteTask } from "../api/taskAPI";
import "../styles/taskItem.css";

const TaskItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      const tasks = await getTasks();
      const foundTask = tasks.find((task) => String(task.id) === String(id));
      setTask(foundTask || {}); 
    };
    fetchTask();
  }, [id]);

  const handleDelete = async () => {
    await deleteTask(id);
    navigate("/"); // Redirect after deletion
  };

  if (!task || Object.keys(task).length === 0) return <p>Loading task...</p>;

  return (
    <div className="task-details">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p className={task.completed ? "status completed" : "status pending"}>
        {task.completed ? "✅ Completed" : "❌ Pending"}
      </p>
      <div className="buttons">
      <button onClick={handleDelete} className="delete">Delete</button>
      <button onClick={() => navigate(`/edit-task/${id}`)} className="edit">Edit</button> {/* Edit Button */}
      </div>
    </div>
  );
};

export default TaskItem;
