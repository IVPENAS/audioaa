const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUploadRoute = require('./fileUpload');

const app = express();

// MongoDB URI from environment variable
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

app.use(cors());
app.use(express.json());

app.use('/api/upload', fileUploadRoute);

app.get('/', (req, res) => {
  res.send('Welcome to the File Upload Service');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
