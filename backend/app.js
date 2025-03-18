// backend/app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const server = http.createServer(app); // Create HTTP server from Express
const io = new Server(server, {
  cors: {
    origin: '*', // Adjust for your frontend domain if needed
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

const PORT = process.env.PORT || 3002;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

// Basic health check
app.get('/', (req, res) => {
  res.send('Hello from TaskFlow Backend with Socket.io!');
});

// Socket.io connection event
io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Export io so we can use it in controllers
module.exports = io;
