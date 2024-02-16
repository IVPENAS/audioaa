import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

export default function AudioFileScreen() {
  const [audioFiles, setAudioFiles] = useState([]);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    fetchAudioFiles();
    return sound ? () => sound.unloadAsync() : undefined;
  }, [sound]);

  const fetchAudioFiles = async () => {
    try {
      const response = await fetch('https://audioheroku-b0fe11645fe4.herokuapp.com/api/audios');
      const data = await response.json();
      setAudioFiles(data);
    } catch (error) {
      console.error('Error fetching audio files:', error);
    }
  };

  const playSound = async (uri) => {
    console.log('Loading Sound to play');
    if (sound) {
      await sound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync({ uri });
    setSound(newSound);

    console.log('Playing Sound');
    await newSound.playAsync();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={audioFiles}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => playSound(item.uri)}>
            <Text style={styles.title}>{item.originalFileName || 'Audio File'}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

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
