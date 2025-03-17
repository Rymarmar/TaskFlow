// backend/controllers/taskController.js
const { tasks } = require('../models/taskModel'); 
// tasks is an in-memory array for now

// GET /api/tasks
exports.getTasks = (req, res) => {
  res.status(200).json(tasks);
};

// POST /api/tasks
exports.createTask = (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }
  const newTask = {
    id: Date.now().toString(),
    title,
    completed: false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

// PUT /api/tasks/:id
exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  
  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  
  if (title !== undefined) tasks[taskIndex].title = title;
  if (completed !== undefined) tasks[taskIndex].completed = completed;

  res.status(200).json(tasks[taskIndex]);
};

// DELETE /api/tasks/:id
exports.deleteTask = (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  tasks.splice(taskIndex, 1);
  res.status(204).send();
};
