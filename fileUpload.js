//fileUpload.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const Audio = require('./AudioModel');

const router = express.Router();

// Update 'audio' to match the field name used in the client-side FormData
const upload = multer({ 
  storage: multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads');
    },
    filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  }),
});

router.post('/', upload.single('audio'), async (req, res) => {
  try {
    const newAudio = new Audio({
      fileName: req.file.filename,
      uploadDate: new Date(),
      metadata: { format: req.file.mimetype, size: req.file.size },
    });
    
    await newAudio.save();
    res.status(201).json(newAudio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error uploading file' });
  }
});

module.exports = router;