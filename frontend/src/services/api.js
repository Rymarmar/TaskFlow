// frontend/src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3002/api'; // Ensure this matches your backend port

// Helper to get token from localStorage (or wherever you store it)
function getAuthToken() {
  return localStorage.getItem('token');
}

const instance = axios.create({
  baseURL: API_URL,
});

// Attach token on each request
instance.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const getTasks = async () => {
  const response = await instance.get('/tasks');
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await instance.post('/tasks', taskData);
  return response.data;
};

export const updateTask = async (taskId, taskData) => {
  const response = await instance.put(`/tasks/${taskId}`, taskData);
  return response.data;
};

export const deleteTask = async (taskId) => {
  await instance.delete(`/tasks/${taskId}`);
};

// Additional endpoints for auth
export const registerUser = async (username, password) => {
  return instance.post('/auth/register', { username, password });
};

export const loginUser = async (username, password) => {
  return instance.post('/auth/login', { username, password });
};
