const express = require('express');
const multer = require('multer');
const path = require('path');
const Audio = require('./AudioModel');
const { predictAudioAuthenticity } = require('./audioModelService');
const mongoose = require('mongoose');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

const router = express.Router();

// Initialize GridFS
let gfs;
mongoose.connection.once('open', () => {
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Set up local storage with Multer
const localStorage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    const uniqueFilename = `${file.originalname}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  },
});

const localUpload = multer({ storage: localStorage });

// Set up GridFS storage
const mongoURI = process.env.MONGODB_URI;
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

router.post('/', localUpload.single('audio'), upload.single('audio'), async (req, res) => {
  try {
    const localFilePath = req.file.path;
    const isFake = await predictAudioAuthenticity(localFilePath);

    const newAudio = new Audio({
      fileName: req.file.filename,
      originalFileName: req.file.originalname,
      uploadDate: new Date(),
      metadata: { format: req.file.mimetype, size: req.file.size },
      isFake: isFake,
      mongoFileId: req.file.id // Assuming `req.file.id` contains the ID from GridFS
    });

    await newAudio.save();
    res.status(201).json(newAudio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error uploading file' });
  }
});

// Route to access the uploaded file
router.get('/files/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).send('File not found');
    }
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  });
});

module.exports = router;
