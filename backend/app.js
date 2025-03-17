// backend/app.js
const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

// Basic health check
app.get('/', (req, res) => {
  res.send('Hello from TaskFlow Backend!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
