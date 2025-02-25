const TaskItem = () => {
  return (
    <li className="task-item">
      <h3>Task Title</h3>
      <p>Task Description</p>
      <p className="status pending">Status: Pending</p>
      <button>Delete</button>
    </li>
  );
};

export default TaskItem;
