// backend/tests/taskRoutes.test.js
const request = require('supertest');
const mongoose = require('mongoose');
require('dotenv').config();

let server;
let Task; // We'll require the Task model
let app; // We'll require the Express app from a separate file if needed

describe('Task Routes', () => {
  beforeAll(async () => {
    // Connect to a test DB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const express = require('express');
    const cors = require('cors');
    const taskRoutes = require('../routes/taskRoutes');
    
    app = express();
    app.use(cors());
    app.use(express.json());
    app.use('/api/tasks', taskRoutes);

    server = app.listen(3005, () => {
      console.log('Test server running on 3005');
    });

    Task = require('../models/taskModel');
  });

  afterAll(async () => {
    await Task.deleteMany({});
    await mongoose.connection.close();
    if (server) server.close();
  });

  it('should return an empty array of tasks initially (unauthorized)', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(401);
  });

  // Additional tests for authenticated routes can go here
});
