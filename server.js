const express = require('express');
const mongoose = require('mongoose');
const fileUploadRoute = require('./fileUpload');

const app = express();

// Use environment variable for MongoDB URI
const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error('MongoDB URI is not set. Please set the MONGODB_URI environment variable.');
  process.exit(1); // Exit the application if the MongoDB URI is not set
}

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/upload', fileUploadRoute);

// Add a simple route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the File Upload Service');
});

const PORT = process.env.PORT || 5000; // Fallback to 5000 for local development
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));