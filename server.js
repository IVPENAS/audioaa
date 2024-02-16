//server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const app = express();

// MongoDB URI from environment variable
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

app.use(cors());
app.use(express.json());

// Initialize GridFS Storage
const storage = new GridFsStorage({
  url: mongoURI,
  options: { useUnifiedTopology: true },
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: 'uploads' // Match the collection name
    };
  }
});

const upload = multer({ storage });

// Route for uploading files
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    console.log('File Uploaded:', req.file.filename);
    res.json({ message: 'File uploaded successfully', file: req.file.filename });
  } else {
    res.status(400).send('File upload failed');
  }
});

// Route to access the uploaded file
app.get('/files/:filename', (req, res) => {
  const collection = mongoose.connection.db.collection('uploads.files'); // The files collection
  collection.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file) {
      return res.status(404).send('File not found');
    }

    const readStream = mongoose.connection.db.gridFSBucket.openDownloadStreamByName(req.params.filename);
    readStream.pipe(res);
  });
});

app.get('/', (req, res) => {
  res.send('Welcome to the File Upload Service');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
