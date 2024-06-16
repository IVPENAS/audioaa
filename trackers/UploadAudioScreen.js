import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as DocumentPicker from "expo-document-picker";
import { Picker } from "@react-native-picker/picker";
import { Audio } from "expo-av";
import { useNavigation } from '@react-navigation/native';

const UploadAudioScreen = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [audioType, setAudioType] = useState("mp3");
  const [fileName, setFileName] = useState(""); // Add state for the file name
  const [recordingsList, setRecordingsList] = useState([]); // Recordings list state

  const navigation = useNavigation(); // Navigation hook

  const handleAudioUpload = async () => {
    if (audioFile) {
      try {
        const asset = await MediaLibrary.createAssetAsync(audioFile);
        console.log("Asset object:", asset);
        console.log("Audio file uploaded successfully:", asset.uri);
        const newRecording = { uri: asset.uri, name: fileName };

        setRecordingsList(prevRecordings => [...prevRecordings, newRecording]);
        navigation.navigate('AudioFilesScreen', { recordingsList: [...recordingsList, newRecording] }); // Navigate to AudioFilesScreen with updated list
      } catch (error) {
        console.error("Error uploading audio file:", error);
      }
    } else {
      console.log("No audio file selected.");
    }
  };

  const pickFile = async () => {
    try {
      console.log("Requesting media library permissions...");
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      console.log("Media library permission status:", mediaLibraryPermission.status);

      console.log("Requesting audio recording permissions...");
      const audioRecordingPermission = await Audio.requestPermissionsAsync();
      console.log("Audio recording permission status:", audioRecordingPermission.status);

      if (mediaLibraryPermission.status === "granted" && audioRecordingPermission.status === "granted") {
        console.log("Permissions granted, opening document picker...");
        const result = await DocumentPicker.getDocumentAsync({
          type: "audio/*",
        });

        console.log("Document Picker Result:", result);

        if (!result.canceled) {
          const file = result.assets[0];
          console.log("File selected:", file.uri);
          setAudioFile(file.uri);
          setFileName(file.name); // Set the file name
        } else {
          console.log("File selection was canceled.");
        }
      } else {
        console.log("Permissions not granted.");
      }
    } catch (err) {
      if (err.name === "Cancel") {
        console.log("User cancelled the picker, no action needed");
      } else {
        console.error("Error picking file:", err);
        throw err;
      }
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
            <Text style={styles.fileName}>{fileName}</Text>
          ) : (
            <Image
              source={require("../assets/UploadButton.png")}
              style={styles.uploadImage}
            />
          )}
        </TouchableOpacity>

        <Text style={styles.label}>Select audio type:</Text>
        <Picker
          style={styles.picker}
          selectedValue={audioType}
          onValueChange={(itemValue, itemIndex) => setAudioType(itemValue)}
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
  fileName: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
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
