import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

import Header from '@/app/header';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { format } from 'date-fns';

export default function HomeScreen() {
  const [facing] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();
  
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Clean up on unmount
  }, []);


  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <Header>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome James!</ThemedText>
      </ThemedView>

      <View>
        <Text style={styles.time}>
          {format(currentDate, 'PP h:mm a')} {/* Example: Apr 8, 2025 at 4:05 PM */}
        </Text>

      </View>
      
      <View style={styles.container}>
        <CameraView style={styles.camera} facing={facing}>
          <View style={styles.buttonContainer}>
          </View>
        </CameraView>
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.buttonStyle}>
          <Text style={styles.buttonText}>Time In</Text>
        </TouchableOpacity>
        <View style={{ width: 20 }} />
        <TouchableOpacity 
          style={[styles.buttonStyle, {backgroundColor: '#fc2424'}]}>
          <Text style={styles.buttonText}>Time Out</Text>
        </TouchableOpacity>
      </View>
    </Header>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 150,
  },
  headerLogo: {
    height: 200,
    width: 430,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  button: {
    flex: 0.3,
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#ffffff80',
    padding: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  time: {
    fontSize: 16,
    color: 'white',
  },
  buttonStyle: {
    backgroundColor: '#1a831a', // Green background
    paddingVertical: 12, // Vertical padding
    paddingHorizontal: 32, // Horizontal padding
    borderRadius: 8, // Rounded corners
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  buttonText: {
    color: 'white', // Text color
    fontSize: 18, // Text size
    fontWeight: 'bold', // Text weight
    textAlign: 'center', // Center text
  },
  buttonGroup: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: "center", 
    alignItems: "center"
  },
});
