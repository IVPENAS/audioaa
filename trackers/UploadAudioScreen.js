// UploadAudioScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Platform } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Picker } from '@react-native-picker/picker';

const UploadAudioScreen = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [audioType, setAudioType] = useState('mp3');

  const handleAudioUpload = async () => {
    if (audioFile) {
      const formData = new FormData();
      formData.append('audio', {
        uri: audioFile.uri,
        type: `audio/${audioType}`,
        name: `upload.${audioType}`,
      });

      try {
        const response = await fetch('https://audioheroku-b0fe11645fe4.herokuapp.com/api/upload', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Upload successful', result);
        } else {
          console.log('Upload failed', response.statusText);
        }
      } catch (error) {
        console.error('Upload failed', error);
      }
    } else {
      console.log('No file selected');
    }
  };

  const pickFile = async () => {
    const permissionResult = await MediaLibrary.requestPermissionsAsync();
    if (permissionResult.granted) {
      const media = await MediaLibrary.getAssetsAsync({
        mediaType: 'audio',
      });

      if (media.assets.length > 0) {
        const selectedAudio = media.assets[0];
        setAudioFile({ uri: selectedAudio.uri });
      }
    } else {
      alert('You need to enable permission to access the library.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <View style={styles.accent}>
          <View style={styles.BMIContainer}>
            <Text style={styles.BMIGreet}>Upload an Audio File</Text>
          </View>
        </View>
      </View>
      <View style={styles.fillOut}>
        <Text style={styles.label}>Select an audio file:</Text>
        <TouchableOpacity onPress={pickFile} style={styles.uploadImageContainer}>
          {audioFile ? (
            <Image
              source={{ uri: audioFile.uri }}
              style={styles.uploadImage}
            />
          ) : (
            <Image
              source={require('../assets/UploadButton.png')}
              style={styles.uploadImage}
            />
          )}
        </TouchableOpacity>

        <Text style={styles.label}>Select audio type:</Text>
        <Picker
          style={styles.picker}
          selectedValue={audioType}
          onValueChange={(itemValue) => setAudioType(itemValue)}
        >
          <Picker.Item label="MP3" value="mp3" />
          <Picker.Item label="WAV" value="wav" />
          <Picker.Item label="M4A" value="m4a" />
        </Picker>

        <TouchableOpacity onPress={handleAudioUpload} style={styles.calculateButton}>
          <Text style={styles.calculateText}>Upload Audio</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    bottom: "0%",
  },
  frame: {
    flex: 1,
    position: "relative",
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  accent: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 450,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: "#0B3954",
  },
  BMIContainer: {
    marginTop: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  BMIGreet: {
    color: "white",
    fontWeight: "500",
    fontSize: 18,
  },
  fillOut: {
    flex: 1,
    position: "absolute",
    top: "20%",
    bottom: "30%",
    left: "7%",
    right: "7%",
    backgroundColor: "#F5F5F5",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingHorizontal: 40,
    paddingTop: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
  uploadImageContainer: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadImage: {
    width: 300,
    height: 300,
  },
  picker: {
    height: 50,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  calculateButton: {
    backgroundColor: "#0B3954",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  calculateText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default UploadAudioScreen;