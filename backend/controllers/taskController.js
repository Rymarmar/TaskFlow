// backend/controllers/taskController.js
const Task = require('../models/taskModel');
const io = require('../app'); // Import the io instance from app.js

// GET /api/tasks
exports.getTasks = async (req, res) => {
  try {
    // Use .lean() to get plain JS objects
    const tasks = await Task.find({ userId: req.user.userId }).lean();

    // Transform _id -> id
    const tasksWithId = tasks.map((task) => ({
      ...task,
      id: task._id,
      _id: undefined, // remove _id if desired
    }));

    res.status(200).json(tasksWithId);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/tasks
exports.createTask = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const newTask = await Task.create({
      title,
      completed: false,
      userId: req.user.userId,
    });

    // Convert the Mongoose doc to a plain object
    const taskObj = newTask.toObject();
    taskObj.id = taskObj._id;
    delete taskObj._id;

    // Emit event to all connected clients
    io.emit('taskCreated', taskObj);

    res.status(201).json(taskObj);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/tasks/:id
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const task = await Task.findOne({ _id: id, userId: req.user.userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;
    await task.save();

    const updatedTask = task.toObject();
    updatedTask.id = updatedTask._id;
    delete updatedTask._id;

    // Emit event for updated task
    io.emit('taskUpdated', updatedTask);

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/tasks/:id
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id, userId: req.user.userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Emit event for deleted task
    io.emit('taskDeleted', { id });

    // 204 means "No Content"
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
