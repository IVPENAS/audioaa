//RecordAudioScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

export default function RecordAudioScreen() {
    const [recording, setRecording] = useState(null);
    const [isRecording, setIsRecording] = useState(false);

    const handleRecording = async () => {
        console.log(isRecording ? 'Stopping recording...' : 'Starting recording...');
        isRecording ? stopRecording() : startRecording();
    };

    const startRecording = async () => {
        try {
            console.log('Requesting permissions...');
            const { status } = await Audio.requestPermissionsAsync();
            if (status !== 'granted') {
                console.log('Audio recording permissions were not granted.');
                Alert.alert('Permission needed', 'Please allow audio recording permissions for this feature to work.');
                return;
            }

            console.log('Setting audio mode...');
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            console.log('Starting recording...');
            const { recording } = await Audio.Recording.createAsync(
                Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            );
            setRecording(recording);
            setIsRecording(true);
            console.log('Recording started.');
        } catch (error) {
            console.error('Failed to start recording:', error);
        }
    };

    const stopRecording = async () => {
        if (!recording) {
            console.log('No recording to stop.');
            return;
        }
        console.log('Stopping recording...');
        setIsRecording(false);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        console.log(`Recording stopped, file saved at: ${uri}`);
        uploadAudio(uri);
    };

    const uploadAudio = async (uri) => {
        console.log(`Preparing to upload audio from: ${uri}`);
        let formData = new FormData();
        formData.append('audio', {
            uri: Platform.OS === "android" ? uri : uri.replace("file://", ""),
            name: `recording-${Date.now()}.m4a`,
            type: 'audio/m4a',
        });

        console.log('Uploading audio...');
        try {
            const response = await fetch('https://audioheroku-b0fe11645fe4.herokuapp.com/api/upload', {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log('Upload successful:', responseData);
            } else {
                console.log(`Upload failed with status: ${response.status}`);
            }
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.frame}>
                <View style={styles.accent}>
                    <Text style={styles.dailyGoalHeader}>Record Audio</Text>
                </View>
            </View>
            <View style={styles.fillOut}>
            <TouchableOpacity
                style={isRecording ? styles.stopButton : styles.recordButton}
                onPress={handleRecording}>
                <Ionicons name="mic" size={24} color="white" />
            </TouchableOpacity>
                <Text style={{ marginTop: 20 }}>
                    {isRecording ? "Recording..." : "Press the mic to start recording"}
                </Text>
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
    fillOut: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    recordButton: {
        backgroundColor: "#1F8EF1",
        padding: 15,
        borderRadius: 50,
    },
    stopButton: {
        backgroundColor: "#FF3B30",
        padding: 15,
        borderRadius: 50,
    },
});
