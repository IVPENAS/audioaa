import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import user from '../assets/user.png';
import accountIcon from '../assets/account-icon.png'; // Replace with your icon paths
import privacyIcon from '../assets/privacy-icon.png';
import helpIcon from '../assets/help-icon.png';
import aboutIcon from '../assets/about-icon.png';
import logoutIcon from '../assets/logout-icon.png';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <View style={styles.accent}>
          {/* Profile Image */}
          <Image source={user} style={styles.profileImage} />
          {/* User Info */}
          <View style={styles.userInfo}>
            <Text style={styles.name}>JUAN DELA CRUZ</Text>
            <Text style={styles.title}>Full Name</Text>
          </View>
          {/* Buttons */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button}>
              <View style={styles.buttonContent}>
                <Image source={accountIcon} style={styles.icon} />
                <Text style={styles.buttonText}>Account Settings</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <View style={styles.buttonContent}>
                <Image source={privacyIcon} style={styles.icon} />
                <Text style={styles.buttonText}>Privacy Policy</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <View style={styles.buttonContent}>
                <Image source={helpIcon} style={styles.icon} />
                <Text style={styles.buttonText}>Help and FAQs</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <View style={styles.buttonContent}>
                <Image source={aboutIcon} style={styles.icon} />
                <Text style={styles.buttonText}>About</Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* Log Out */}
          <TouchableOpacity style={styles.logOutButton}>
            <View style={styles.buttonContent}>
              <Image source={logoutIcon} style={styles.logOutIcon} />
              <Text style={styles.logOutText}>Log Out</Text>
            </View>
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
    bottom: 0,
    backgroundColor: '#0B3954',
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 50,
    
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonsContainer: {
    marginTop: 30,
    width: '80%',
    marginBottom: 50,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 80,
  },
  buttonText: {
    color: '#0B3954',
    fontSize: 16,
    paddingLeft: 10,
  },
  logOutButton: {
    position: 'absolute',
    bottom: 20,
  },
  logOutText: {
    color: 'white',
    fontSize: 16,
    textDecorationLine: 'underline',
    paddingLeft: 5,
  },
  userInfo: {
    alignItems: 'center',
    marginTop: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  title: {
    fontSize: 16,
    color: 'white',
  },
  icon: {
    width: 17,
    height: 17,

  },
  logOutIcon: {
    width: 15,
    height: 15,

  },
});

export default ProfileScreen;
