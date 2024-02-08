// fileUpload.js
const express = require('express');
const multer = require('multer');
const Audio = require('./AudioModel'); // Ensure this path is correct

const router = express.Router();

// Configure storage for multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST endpoint for uploading an audio file
router.post('/', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      console.log('No file uploaded.');
      return res.status(400).send('No file uploaded.');
    }

    // Create a new document in the database for the uploaded audio
    const newAudio = new Audio({
      fileName: req.file.originalname,
      uploadDate: new Date(),
      duration: parseInt(req.body.duration, 10) || undefined,
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
