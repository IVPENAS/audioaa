//fileUpload.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const Audio = require('./AudioModel'); // Ensure this path is correct

const router = express.Router();

// Configure storage for multer
const storage = multer.diskStorage({
  // Destination for the uploaded files
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },
  // Add file extension to the uploaded files
  filename: function(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// Initialize upload with the storage configuration
const upload = multer({ storage: storage });

// POST endpoint for uploading an audio file
router.post('/', upload.single('audio'), async (req, res) => {
  try {
    console.log('Received a file upload request:', req.file);

    if (!req.file) {
      console.log('No file uploaded.');
      return res.status(400).send('No file uploaded.');
    }

    // Create a new document in the database for the uploaded audio
    const newAudio = new Audio({
      fileName: req.file.filename,
      uploadDate: new Date(),
      duration: req.body.duration ? parseInt(req.body.duration, 10) : undefined,
      metadata: {
        format: req.file.mimetype,
        size: req.file.size.toString(),
        // Add more metadata as needed
      },
      uploadedBy: req.body.uploadedBy || 'anonymous',
    });
    
    const savedAudio = await newAudio.save();
    console.log('Audio information saved:', savedAudio);

    res.status(201).json(savedAudio);
  } catch (error) {
    console.error('Error during audio file upload:', error);
    res.status(500).json({ error: 'Error saving audio file information to the database.' });
  }
});

module.exports = router;
