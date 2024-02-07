import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import UploadAudio from '../assets/UploadAudio.png';
import RecordAudio from '../assets/RecordAudio.png';
import AudioFiles from '../assets/AudioFiles.png';
import More from '../assets/More.png';
import next from '../assets/next.png';

  const ActionsScreen = () => {
    const navigation = useNavigation();

    const goToUploadAudioScreen = () => {
      navigation.navigate('UploadAudioScreen');
    };
    const goToRecordAudioScreen = () => {
      navigation.navigate('RecordAudioScreen');
    };
    const goToAudioFilesScreen = () => {
      navigation.navigate('AudioFilesScreen');
    };
    const goToMoreScreen= () => {
      navigation.navigate('MoreScreen');
    };

  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <View style={styles.accent} />
        <Text style={[styles.accentText, styles.boldText, styles.biggerText]}>Select your Actions</Text>
        <Text style={[styles.accentText, styles.boldText]}>What do you want to do?</Text>
      </View>
      <View style={styles.fillOut}>
        <View style={styles.actionsButtons}>
          
          <Pressable style={styles.uploadButton} onPress={goToUploadAudioScreen}>
            <Image source={UploadAudio} style={styles.image} />
              <Text style={[styles.boldText, styles.biggerText]}> Upload Audio</Text>
            <Image source={next} style={styles.next} />
          </Pressable>

          <Pressable style={styles.recordButton} onPress={goToRecordAudioScreen}>
            <Image source={RecordAudio} style={styles.image} />
              <Text style={[styles.boldText, styles.biggerText]}> Record Audio</Text>
            <Image source={next} style={styles.next} />
          </Pressable>

          <Pressable style={styles.filesButton} onPress={goToAudioFilesScreen}>
            <Image source={AudioFiles} style={styles.image} />
              <Text style={[styles.boldText, styles.biggerText]}> Audio Files</Text>
            <Image source={next} style={styles.next} />
          </Pressable>

          <Pressable style={styles.moreButton} onPress={goToMoreScreen}> 
            <Image source={More} style={styles.image} />
              <Text style={[styles.boldText, styles.biggerText]}> More</Text>
            <Image source={next} style={styles.next} />
          </Pressable>
          
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    bottom: '0%'
  },
  frame: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'white', 
    paddingHorizontal: 10,
  },
  accent: {
    flex: 1,
    position: 'absolute', 
    top: 0,
    left: 0,
    right: 0,
    bottom: '70%',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: '#0B3954',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accentText: {
    color: 'white',
    textAlign: 'center',
    paddingTop: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
  biggerText: {
    fontSize: 20,
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginLeft: 20,
    marginRight: 20,
  },
  next: {
    width: 25,
    height: 25,
    marginLeft: 'auto',

  },
  fillOut: {
    flex: 1,
    position: 'absolute', 
    top: '21%', 
    bottom: '7%',
    left: '7%',
    right: '7%',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 10,
    paddingTop: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  actionsButtons: {
    marginTop: 20,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CDEDFD',
    paddingVertical: 25,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 30,
    borderColor: '#0B3954',
    elevation: 5,
  },
  recordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A9F8FB',
    paddingVertical: 25,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 30,
    borderColor: '#0B3954',
    elevation: 5,
  },
  filesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B6DCFE',
    paddingVertical: 25,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 30,
    borderColor: '#0B3954',
    elevation: 5,
  },
  moreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22FFEF',
    paddingVertical: 25,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 30,
    borderColor: '#0B3954',
    elevation: 5,
  },
});

export default ActionsScreen;
 