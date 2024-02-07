import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { AntDesign } from "@expo/vector-icons";
import AudioFilesScreen from "./AudioFilesScreen"; // Import AudioFileScreen

export default function RecordAudioScreen({ navigation }) {
  const [recording, setRecording] = useState();
  const [audioName, setAudioName] = useState("No Audio");
  const [audioUri, setAudioUri] = useState(null); // Add state for audio URI

  const handleRecord = async () => {
    try {
      const { sound, status } = await Audio.Recording.createAsync();
      setRecording(sound);
      setAudioName(status.startingTime);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const handleDownload = async () => {
    try {
      const { uri } = await FileSystem.downloadAsync(`content://${audioUri}`, FileSystem.documentDirectory + `${Date.now()}-audio.mp3`);
      console.log('Audio downloaded successfully', uri);
    } catch (error) {
      console.error('Error downloading audio', error);
    }
  };

  const handleStop = async () => {
    if (recording) {
      recording.stopAndUnloadAsync();
      setRecording(null);
      setAudioName("Recording stopped");
      const info = await FileSystem.getInfoAsync(recording.getURI());
      setAudioUri(info.uri); // Set the audio URI
      navigation.navigate("AudioFile", { audioUri: info.uri });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <View style={styles.accent}>
          <Text style={styles.dailyGoalHeader}>Record Audio</Text>
          <View style={styles.goalContainer}>
            <Text style={styles.goalSteps}>{audioName}</Text>
          </View>
        </View>
      </View>
      <View style={styles.fillOut}>
        <View style={styles.audioContainer}>
          {!!recording ? (
            <TouchableOpacity style={styles.stopButton} onPress={handleStop}>
              <AntDesign name="stop" size={24} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.recordButton} onPress={handleRecord}>
              <AntDesign name="mic" size={24} color="white" />
            </TouchableOpacity>
          )}
          {audioUri && (
            <Image
              source={{ uri: `data:image/png;base64,${audioUri}` }}
              style={styles.waveformImage}
            />
          )}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Download"
          onPress={handleDownload}
          disabled={!audioUri}
        />
        <Button title="Upload" onPress={handleAudioUpload} disabled={!audioUri} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  frame: {
    width: "100%",
    height: 150,
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    marginTop: 30,
    overflow: "hidden",
  },
  accent: {
    backgroundColor: "#1F8EF1",
    width: "100%",
    height: "100%",
    position: "absolute",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  dailyGoalHeader: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  goalContainer: {
    width: "100%",
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  goalSteps: {
    color: "#1F8EF1",
    fontSize: 16,
    fontWeight: "bold",
  },
  fillOut: {
    width: "100%",
    alignItems: "center",
  },
  audioContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  recordButton: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "#1F8EF1",
    padding: 10,
    borderRadius: 50,
  },
  stopButton: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "#FF3B30",
    padding: 10,
    borderRadius: 50,
  },
  waveformImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 30,
  },
});