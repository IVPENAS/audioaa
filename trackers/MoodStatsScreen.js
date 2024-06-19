import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from "react-native";
import Medal from '../assets/medal_star.png';
import joyful from '../assets/Joyful.png';
import relaxed from '../assets/Relaxed.png';
import neutral from '../assets/Neutral.png';
import stressed from '../assets/Stressed.png';
import melancholy from '../assets/Melancholy.png';

const MoodStatsScreen = ({ route }) => {
  const [moodCounts, setMoodCounts] = useState({
    Joyful: 0,
    Relaxed: 0,
    Neutral: 0,
    Stressed: 0,
    Melancholy: 0,
  });

  useEffect(() => {
    const { selectedMood } = route.params;
    if (selectedMood) {
      setMoodCounts((prevCounts) => ({
        ...prevCounts,
        [selectedMood]: prevCounts[selectedMood] + 1,
      }));
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <View style={styles.accent}>
            <Text style={styles.accentText}>
              Mood Statistics 
            </Text>
        </View>
      </View>
      <View style={styles.fillOut}>
        <View style={styles.innerContainer}>
          <Text style={styles.text2}> Longest Streak </Text>
          <Text style={styles.text3}> Current Streak </Text>
          <Text style={styles.text4}> 126 days </Text>
          <Text style={styles.text5}> 126 days </Text>
          <Image source={Medal} style={styles.Medal} />
        </View>

        <View style={styles.MoodContainer}>
          {/* Mood 1 */}
            <View style={styles.moodRow}>
              <View style={styles.moodPart}>
                <Image source={joyful} style={styles.icon} />
              </View>
              <View style={styles.moodPart}>
                <Text style={styles.moodText}>Joyful</Text>
              </View>
              <View style={styles.moodPart}>
                <Text style={styles.moodNumber}>{moodCounts.Joyful}</Text>
              </View>
            </View>
          {/* Mood 2 */}
          <View style={styles.moodRow}>
            <View style={styles.moodPart}>
              <Image source={relaxed} style={styles.icon} />
            </View>
            <View style={styles.moodPart}>
              <Text style={styles.moodText}>Relaxed</Text>
            </View>
            <View style={styles.moodPart}>
              <Text style={styles.moodNumber}>{moodCounts.Relaxed}</Text>
            </View>
          </View>
          {/* Mood 3 */}
          <View style={styles.moodRow}>
            <View style={styles.moodPart}>
              <Image source={neutral} style={styles.icon} />
            </View>
            <View style={styles.moodPart}>
              <Text style={styles.moodText}>Neutral</Text>
            </View>
            <View style={styles.moodPart}>
              <Text style={styles.moodNumber}>{moodCounts.Neutral}</Text>
            </View>
          </View>
          {/* Mood 4 */}
          <View style={styles.moodRow}>
            <View style={styles.moodPart}>
              <Image source={stressed} style={styles.icon} />
            </View>
            <View style={styles.moodPart}>
              <Text style={styles.moodText}>Stressed</Text>
            </View>
            <View style={styles.moodPart}>
              <Text style={styles.moodNumber}>{moodCounts.Stressed}</Text>
            </View>
          </View>
          {/* Mood 5 */}
          <View style={styles.moodRow}>
            <View style={styles.moodPart}>
              <Image source={melancholy} style={styles.icon} />
            </View>
            <View style={styles.moodPart}>
              <Text style={styles.moodText}>Melancholy</Text>
            </View>
            <View style={styles.moodPart}>
              <Text style={styles.moodNumber}>{moodCounts.Melancholy}</Text>
            </View>
          </View>
        </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: '70%',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    backgroundColor: '#0B3954',
  },
  accentText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  fillOut: {
    flex: 1,
    position: "absolute",
    top: "20%",
    bottom: "5%",
    left: "7%",
    right: "7%",
    backgroundColor: "#F5F5F5",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    elevation: 5,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    flex: 0,
    marginBottom: 280,
    width: 300,
    top: 10,
    backgroundColor: "#0B3954",
    borderRadius: 30,
  },
  MoodContainer: {
    flex: 1,
    width: 300,
    height: 200,
    bottom: 50,
  },
  moodRow: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 30,
  },
  moodPart: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  moodText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  moodNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0B3954',
  },
  text1: {
    fontSize: 15,
    fontWeight: "bold",
    color: 'black',
  },
  text2: {
    bottom: 0,
    right: 0,
    left: 40,
    top: 18,
    fontSize: 13,
    color: "#B0B0B0",
    fontWeight: "bold",
  },
  text3: {
    bottom: 0,
    top: 22,
    left: 28,
    right: 0,
    fontSize: 15,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  text4: {
    bottom: 23,
    right: 0,
    left: 205,
    fontSize: 13,
    color: "#B0B0B0",
    fontWeight: "bold",
  },
  text5: {
    bottom: 17,
    right: 0,
    left: 195,
    fontSize: 15,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  Medal: {
    height: 15,
    width:  15,
    bottom: 57,
    left: 23,
  },

});

export default MoodStatsScreen;

