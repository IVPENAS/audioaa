import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AudioFileScreen({ route }) {
  const { audioUri } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.audioUriText}>{audioUri}</Text>
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
  audioUriText: {
    fontSize: 18,
  },
});