// frontend/src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import TaskList from '../components/TaskList';
import AddTask from '../components/AddTask';
import { getTasks } from '../services/api';

function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>TaskFlow</h1>
      <AddTask onTaskAdded={fetchTasks} />
      <TaskList tasks={tasks} onTasksChanged={fetchTasks} />
    </div>
  );
}

export default Home;
