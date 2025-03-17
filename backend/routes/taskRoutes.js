// backend/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');

// GET all tasks
router.get('/', getTasks);

// CREATE a new task
router.post('/', createTask);

// UPDATE a task
router.put('/:id', updateTask);

// DELETE a task
router.delete('/:id', deleteTask);

module.exports = router;
