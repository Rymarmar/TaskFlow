// frontend/src/components/TaskList.jsx
import React from 'react';
import { updateTask, deleteTask } from '../services/api';

function TaskList({ tasks, onTasksChanged }) {
  const handleToggleComplete = async (task) => {
    try {
      await updateTask(task.id, {
        completed: !task.completed,
      });
      onTasksChanged();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      onTasksChanged();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {tasks.map((task) => (
        <li key={task.id} style={{ marginBottom: '0.5rem' }}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => handleToggleComplete(task)}
          />
          <span style={{ marginLeft: '0.5rem' }}>
            {task.title} {task.completed ? '(Completed)' : ''}
          </span>
          <button
            onClick={() => handleDelete(task.id)}
            style={{ marginLeft: '1rem' }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
