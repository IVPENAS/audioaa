const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const path = require('path');

// Define the path to the model files
const MODEL_PATH = path.resolve(__dirname, 'model.json');

// Load the model
let model;
const loadModel = async () => {
  try {
    model = await tf.loadLayersModel(`file://${MODEL_PATH}`);
    console.log('Model loaded successfully');
  } catch (error) {
    console.error('Error loading model:', error);
  }
};

// Ensure the model is loaded when the application starts
loadModel().catch(err => console.error('Error loading model:', err));

// Function to preprocess audio
const preprocessAudio = (audioPath) => {
  const audioBuffer = fs.readFileSync(audioPath);
  const audioTensor = tf.tensor1d(new Float32Array(audioBuffer.buffer));
  return audioTensor;
};

// Function to predict audio authenticity
const predictAudioAuthenticity = async (audioPath) => {
  const audioTensor = preprocessAudio(audioPath);
  const reshapedTensor = audioTensor.reshape([1, audioTensor.shape[0]]);
  const prediction = model.predict(reshapedTensor);
  const isFake = prediction.dataSync()[0] > 0.5;
  return isFake;
};

module.exports = { predictAudioAuthenticity };
