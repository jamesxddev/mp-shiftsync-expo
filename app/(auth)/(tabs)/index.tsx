import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

import Header from '@/app/header';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { format } from 'date-fns';
import { useAuth } from '../../../contexts/AuthContext';
import * as shiftApi from '../../../api/shift';

import { Shift } from '../../../types/shiftAttendance'

export default function HomeScreen() {
  const { user } = useAuth();

  const [facing, setFacing] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();
  
  const [currentDate, setCurrentDate] = useState(new Date());

  const [presentToday, setPresentToday] = useState(false);
  const [shiftId, setShiftId] = useState('');
  const [timeOutDisabled, setTimeOutDisabled] = useState(true);
  const [shifts, setShifts] = useState<Shift[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  useEffect(() => {
    fetchAttendance()
  }, []);

  const fetchAttendance = async () => {
    try {
      const username = user?.username;
      if (!username) {
        console.error("Username is missing");
        return;
      }

      var response = await shiftApi.getShiftAttendance(user!.username);
      console.log(response,'response TODAYS SHIFT')

      setPresentToday(response.presentToday);
      setShiftId(response.shiftId);
      setShifts(response.shifts)

      console.log(shifts, 'shifts USESTATE')
      
      timeOutButton(response.presentToday, response.shiftEnded);

    } catch (error) {
      console.error("Failed to fetch shifts", error);
    }

  }

  const handleTimeIn = async () => {
    var response = await shiftApi.timeIn(user!.username);
    if (response.isSuccess) {
      setPresentToday(true);
      timeOutButton(true, false)
      fetchAttendance();
    }
  }

  const handleTimeOut = async () => {
    var response = await shiftApi.endShift(user!.username, shiftId);
    console.log(response, 'response -> TIMEOUT')
    
    timeOutButton(true, true)
    fetchAttendance();
  }

  const timeOutButton = (startShift: boolean, endShift: boolean) => {

    if (startShift) {
      setTimeOutDisabled(false);
    }

    if (endShift) {
      setTimeOutDisabled(true);
    }

  }

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

  const renderItem = ({ item }: { item: Shift }) => (
    <View style={styles.row}>
      <ThemedText style={styles.cell}>{new Date(item.timeIn).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })}</ThemedText>
      <ThemedText style={styles.cell}>{new Date(item.timeIn).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}</ThemedText>
      <ThemedText style={styles.cell}>{item.timeOut !== null ? new Date(item.timeOut).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }) : ''} </ThemedText>
    </View>
  );

  return (
    <Header>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome {user?.username}</ThemedText>
      </ThemedView>

      <View>
        
        <ThemedText style={styles.time} >{format(currentDate, 'PP h:mm a')} {/* Example: Apr 8, 2025 at 4:05 PM */}</ThemedText>

      </View>
      
      <View style={styles.container}>
        <CameraView style={styles.camera} facing={facing}>
          <View style={styles.buttonContainer}>
          </View>
        </CameraView>
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          onPress={handleTimeIn}
          disabled={presentToday}
          style={[styles.buttonStyle, {
            opacity: !presentToday ? 1: 0.5}
          ]}
          >
          <Text style={styles.buttonText}>Time In</Text>
        </TouchableOpacity>
        <View style={{ width: 20 }} />
        <TouchableOpacity
          onPress={handleTimeOut}
          disabled = {timeOutDisabled} 
          style={[styles.buttonStyle, {
            backgroundColor: '#fc2424',  
            opacity: timeOutDisabled ? 0.5 : 1 }, ]}>
          <Text style={styles.buttonText}>Time Out</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.container}>
        <ThemedText style={styles.title}>Shifts</ThemedText>
        <View style={[styles.row, styles.header]}>
          <ThemedText style={[styles.cell, styles.headerText]}>Date</ThemedText>
          <ThemedText style={[styles.cell, styles.headerText]}>Time In</ThemedText>
          <ThemedText style={[styles.cell, styles.headerText]}>Time Out</ThemedText>
        </View>
        <FlatList
          scrollEnabled={false}
          data={shifts}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
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
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  time: {
    fontSize: 16,
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
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
    color: "white"
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  header: {
    backgroundColor: "#f0f0f0",
  },
  headerText: {
    fontWeight: "bold",
    color: "black"
  },
});
