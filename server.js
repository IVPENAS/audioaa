//server.js
const express = require('express');
const mongoose = require('mongoose');
const fileUploadRoute = require('./fileUpload'); // Ensure the path is correct

const app = express();

// MongoDB connection setup
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json()); // For parsing application/json
app.use('/uploads', express.static('uploads')); // Serve files from 'uploads' directory
app.use('/api/upload', fileUploadRoute); // File upload route

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the File Upload Service');
});

// Start server
const PORT = process.env.PORT || 5000; // Use the environment variable or default to 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
