import { useState, useEffect } from "react";
import { useParams, useNavigate,Link } from "react-router-dom";
import { getTasks, updateTask } from "../api/taskAPI";
import "../styles/editTask.css";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({ title: "", description: "", completed: false });

  useEffect(() => {
    const fetchTask = async () => {
      const tasks = await getTasks();
      const foundTask = tasks.find((task) => String(task.id) === String(id));
      if (foundTask) {
        setTask(foundTask);
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTask(id, task);
    navigate(`/task/${id}`); // Redirect back to task details
  };

  return (
    <div className="edit-task-container">

      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" value={task.title} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" value={task.description} onChange={handleChange} required />

        <label>
          Completed:
          <input type="checkbox" name="completed" checked={task.completed} onChange={handleChange} />
        </label>
        <div className="buttons">
        <button type="submit">Save Changes</button>
        <Link to={'/'}>Tasks</Link>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
