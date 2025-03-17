// backend/app.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Simple route
app.get('/', (req, res) => {
  res.send('Hello from the Backend!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
