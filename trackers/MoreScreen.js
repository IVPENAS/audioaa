import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import joyful from '../assets/Joyful.png';
import relaxed from '../assets/Relaxed.png';
import neutral from '../assets/Neutral.png';
import stressed from '../assets/Stressed.png';
import melancholy from '../assets/Melancholy.png';
import icon1 from '../assets/1.png'; 
import icon2 from '../assets/2.png';
import icon3 from '../assets/3.png';
import icon4 from '../assets/4.png';
import icon5 from '../assets/5.png';

const MoreScreen = () => {
  const navigation = useNavigation();

  const [selectedMood, setSelectedMood] = useState(null);

  const handleMoodSelection = (mood) => {
    setSelectedMood(mood);
  };

  const handleSubmit = () => {
    navigation.navigate('MoodStatsScreen', { selectedMood });
  };
  

  const renderMoodContainer = (imageSource, moodText, iconSource) => {
    const isSelected = selectedMood === moodText;
    return (
      <TouchableOpacity
        style={[
          styles.containerRow,
          isSelected ? { backgroundColor: '#0B3954' } : null,
        ]}
        onPress={() => handleMoodSelection(moodText)}
      >
        <View style={styles.icon}>
          <Image source={imageSource} style={styles.iconImage} />
        </View>
        <Text style={[styles.text, isSelected ? { color: 'white' } : null]}>
          {moodText}
        </Text>
        <Image source={iconSource} style={styles.iconNumber} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <View style={styles.accent}>
          <View style={styles.GreetContainer}>
            <Text style={styles.MoodGreet}>
              How are you feeling today?
            </Text>
            <Text style={styles.subGreet}>Select your mood</Text>
          </View>
        </View>
      </View>
      <View style={styles.fillOut}>
        <View style={styles.bottomContainer}>
          {renderMoodContainer(joyful, 'Joyful', icon5)}
          {renderMoodContainer(relaxed, 'Relaxed', icon4)}
          {renderMoodContainer(neutral, 'Neutral', icon3)}
          {renderMoodContainer(stressed, 'Stressed', icon2)}
          {renderMoodContainer(melancholy, 'Melancholy', icon1)}
          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
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
  },
  fillOut: {
    flex: 1,
    position: "absolute",
    top: "20%",
    bottom: "10%",
    left: "7%",
    right: "7%",
    backgroundColor: "#F5F5F5",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    elevation: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  GreetContainer: {
    marginTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  MoodGreet: {
    color: 'white',
    fontWeight: '500',
    fontSize: 18,
  },
  subGreet: {
    color: 'white',
    fontWeight: '300',
    fontSize: 14,
  },
  bottomContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    borderRadius: 40,
    backgroundColor: '#F5F5F5',
    elevation: 5,
  },
  iconImage: {
    height: 50,
    width: 50,
  },
  text: {
    fontWeight: 'bold',
  },
  iconNumber: {
    height: 50,
    width: 60,
    borderRadius: 30,
  },
  submitButton: {
    backgroundColor: '#0B3954',
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MoreScreen;
