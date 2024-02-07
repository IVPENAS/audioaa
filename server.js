//server.js
const express = require('express');
const mongoose = require('mongoose');
const fileUploadRoute = require('./fileUpload');

const app = express();

mongoose.connect('mongodb+srv://etnases015:phcx1234@audio.4ucfx0y.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/upload', fileUploadRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
