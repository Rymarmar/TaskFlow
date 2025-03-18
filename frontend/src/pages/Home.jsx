// frontend/src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import TaskList from '../components/TaskList';
import AddTask from '../components/AddTask';
import { getTasks } from '../services/api';

function Home() {
  const [tasks, setTasks] = useState([]);
  const socketRef = React.useRef(null);

  useEffect(() => {
    fetchTasks();

    // Connect to Socket.io
    socketRef.current = io('http://localhost:3002'); // Adjust if needed
    socketRef.current.on('taskCreated', (newTask) => {
      setTasks((prev) => [...prev, newTask]);
    });

    socketRef.current.on('taskUpdated', (updatedTask) => {
      setTasks((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
    });

    socketRef.current.on('taskDeleted', ({ id }) => {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    });

    return () => {
      // Disconnect on unmount
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
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
