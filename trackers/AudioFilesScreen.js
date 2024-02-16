import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

export default function AudioFileScreen() {
  const [audioFiles, setAudioFiles] = useState([]);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    fetchAudioFiles();
  }, []);

  useEffect(() => {
    return sound ? () => {
      console.log('Unloading Sound');
      sound.unloadAsync();
    } : undefined;
  }, [sound]);

  const fetchAudioFiles = async () => {
    console.log('Fetching audio files from backend');
    try {
      const response = await fetch('https://audioheroku-b0fe11645fe4.herokuapp.com/api/audios');
      const data = await response.json();
      console.log('Audio files fetched:', data);
      setAudioFiles(data);
    } catch (error) {
      console.error('Error fetching audio files:', error);
    }
  };

  const playSound = async (uri) => {
    console.log('Loading Sound with URI:', uri);
    if (!uri) {
      console.error('URI is null, cannot load the audio file.');
      return;
    }

    if (sound) {
      console.log('Unloading previous sound');
      await sound.unloadAsync();
    }

    try {
      console.log('Creating new sound object');
      const { sound: newSound } = await Audio.Sound.createAsync({ uri });
      setSound(newSound);
      console.log('Playing sound');
      await newSound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={audioFiles}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => playSound(item.fullUri)}>
            <Text style={styles.title}>{item.originalFileName || 'Audio File'}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
// The styles remain unchanged
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },
});
