const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUploadRoute = require('./fileUpload');
const Audio = require('./AudioModel'); // Ensure this path is correct

const app = express();

// MongoDB URI from environment variable
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  console.error('MongoDB URI is not set. Please set the MONGODB_URI environment variable.');
  process.exit(1);
}

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(cors()); // Enable CORS
app.use(express.json()); // For parsing application/json
app.use('/uploads', express.static('uploads')); // Serve static files from 'uploads'
app.use('/api/upload', fileUploadRoute);

// New route to fetch all audio files
app.get('/api/audios', async (req, res) => {
  try {
    const audios = await Audio.find();
    res.json(audios);
  } catch (err) {
    console.error('Error fetching audios:', err);
    res.status(500).json({ message: "Failed to fetch audio files", error: err });
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to the File Upload Service');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
