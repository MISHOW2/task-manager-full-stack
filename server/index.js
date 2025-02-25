const express = require('express');
const cors = require('cors');
const app = express();
const tasks = require('./config/tasks');

app.use(cors());
app.use(express.json()); // ✅ Fix: Parse incoming JSON requests

// Get all tasks
app.get('/tasks', (req, res) => {
    if (!tasks) {
        res.status(404).json({success:false, message:'no was data found'})
    }else{
        res.status(200).json({ success: true, data: tasks });
    }
    
});

// Get task by ID
app.get('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const task = tasks.find(task => task.id === Number(id));

    if (!task) {
        return res.status(404).json({ success: false, msg: 'Task not found' });
    }
    
    res.status(200).json({ success: true, data: task });
});

// Add new task
app.post('/tasks', (req, res) => {
    const { title, description, completed } = req.body;

    if (!title || !description || completed === undefined) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newTask = {
        id: tasks.length + 1,
        title,
        description,
        completed
    };

    tasks.push(newTask);
    res.status(201).json({ success: true, data: newTask });
});

// Update task
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    let task = tasks.find(task => task.id === Number(id));
    if (!task) {
        return res.status(404).json({ success: false, message: 'Task not found' });
    }

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.completed = completed ?? task.completed;

    res.status(200).json({ success: true, message: "Task updated", data: task });
});

// Delete task
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const taskIndex = tasks.findIndex(task => task.id === Number(id));

    if (taskIndex === -1) {
        return res.status(404).json({ success: false, message: "Task not found" });
    }

    tasks.splice(taskIndex, 1);
    res.status(200).json({ success: true, message: "Task removed successfully" });
});

// Start server
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
