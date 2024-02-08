const express = require('express');
const mongoose = require('mongoose');
const fileUploadRoute = require('./fileUpload');

const app = express();

// Use environment variable for MongoDB URI, no fallback in the source code
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
