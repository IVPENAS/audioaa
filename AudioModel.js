const mongoose = require('mongoose');

const AudioSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true
  },
  originalFileName: {
    type: String,
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  metadata: {
    format: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: true
    }
  },
  isFake: {
    type: Boolean,
    required: true
  },
  mongoFileId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

module.exports = mongoose.model('Audio', AudioSchema);
