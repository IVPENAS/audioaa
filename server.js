const express = require('express');
const mongoose = require('mongoose');
const fileUploadRoute = require('./fileUpload'); // Ensure this path is correct
const path = require('path');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// File upload route
app.use('/api/upload', fileUploadRoute);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Audio File Upload Service');
});

// Environment variable for MongoDB URI
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  console.error('MongoDB URI is not set. Please set the MONGODB_URI environment variable.');
  process.exit(1); // Exit if the MongoDB URI is not set
}

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Port configuration
const PORT = process.env.PORT || 5000; // Use environment variable or default to 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
