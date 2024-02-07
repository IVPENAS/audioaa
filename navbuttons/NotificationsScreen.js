import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NotificationsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <View style={styles.accent} />
      </View>
      <View style={styles.fillOut}>
        <Text style={styles.notification}>
          NOTIFICATIONS
        </Text>
      <View style={styles.Notif1}>
        <Text>You recorded 19 audios today.</Text>
      </View>
      <View style={styles.Notif2}>
        <Text>File record21010824.wav is Real.</Text>
      </View>
      <View style={styles.Notif3}>
        <Text>File record22010824.wav is Real.</Text>
      </View>
      <View style={styles.Notif4}>
        <Text>File record23010824.wav is Real.</Text>
      </View>
      <View style={styles.Notif4}>
        <Text>File record24010824.wav is Fakes.</Text>
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
    position: 'absolute', 
    top: '20%', 
    bottom: '08%',
    left: '7%',
    right: '7%',
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingHorizontal: 20,
    paddingTop: 30,
    elevation: 5,
  },
  notification: {
    fontWeight: 'bold',
    fontSize: 29,
    position: 'absolute',
    color: 'white',
    marginTop: -100,

  },
  Notif1: {
    backgroundColor: 'lightgrey',
    paddingVertical: 19,
    borderRadius: 15,
    marginTop: 20,
    alignItems: 'center',
    bottom:'3%'
  },
  Notif2: {
    backgroundColor: 'lightgrey',
    paddingVertical: 19,
    borderRadius: 15,
    marginTop: 20,
    alignItems: 'center',
    bottom:'3%'
  },
  Notif3: {
    backgroundColor: 'lightgrey',
    paddingVertical: 19,
    borderRadius: 15,
    marginTop: 20,
    alignItems: 'center',
    bottom:'3%'
  },
  Notif4: {
    backgroundColor: 'light grey',
    paddingVertical: 19,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    bottom:'3%'
  },

});

export default NotificationsScreen;
