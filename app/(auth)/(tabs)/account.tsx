import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Platform, TouchableOpacity, Text, View, Alert, TextInput } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import Header from '@/app/header';
import { useAuth } from '@/contexts/AuthContext';

import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

import * as authApi from '@/api/auth';


export default function TabTwoScreen() {

  const { logout, user } = useAuth();

  const [image, setImage] = useState<string | null>(null);

  // Password states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isSecurityOpen, setIsSecurityOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(true);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSignOut = () => {
    logout();
  };

  const handleChangePassword = async () => {
    var response = await authApi.updatePassword(user!.username, newPassword);

    if (!response) {
      console.warn('Time in failed or user unauthorized');
      return;
    }

    if (!response.isSuccess) { 
      alert('Password changed failed!')
    }

    alert('Password changed successfully!')
  }

  return (
    <Header>
      <View style={styles.container}>
      <TouchableOpacity 
        // onPress={pickImage}
        >
        <Image
          source={image ? { uri: image } : require('@/assets/images/default-avatar.png')}
          style={styles.avatar}
        />
        {/* <Text style={styles.changePicText}>Tap to change picture</Text> */}
      </TouchableOpacity>

      <ThemedText style={styles.username}>{user?.username}</ThemedText>

      <View style={styles.section}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => setIsProfileOpen(prev => !prev)}
        >
          <ThemedText style={styles.sectionTitle}>Profile</ThemedText>
          <Ionicons
            name={isProfileOpen ? 'chevron-up' : 'chevron-down'}
            size={24}
            color="#333"
          />
        </TouchableOpacity>

        {isProfileOpen && (
          <View style={styles.securityContent}>
            <TextInput
              style={styles.inputDisabled}
              placeholder="Full Name"
              value={user?.fullName}
              
              editable={false}
            />
            <TextInput
              style={styles.inputDisabled}
              placeholder="Username"
              value={user?.username}
              editable={false}
            />
            
          </View>
        )}
      </View>

      {/* Collapsible SECURITY SECTION */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => setIsSecurityOpen(prev => !prev)}
        >
          <ThemedText style={styles.sectionTitle}>Security</ThemedText>
          <Ionicons
            name={isSecurityOpen ? 'chevron-up' : 'chevron-down'}
            size={24}
            color="#333"
          />
        </TouchableOpacity>

        {isSecurityOpen && (
          <View style={styles.securityContent}>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              placeholderTextColor="#000"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              placeholderTextColor="#000"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity style={styles.button} 
              onPress={handleChangePassword}
              >
              <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <TouchableOpacity style={[styles.button, styles.signOut]} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
      
    </Header>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ccc',
  },
  changePicText: {
    marginTop: 8,
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
  },
  username: {
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#1e90ff',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginVertical: 10,
  },
  signOut: {
    backgroundColor: '#ff4d4d',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center'
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  section: {
    width: '100%',
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 16,
    borderColor: '#d1d5db',
    borderWidth: 1,
    color: "#000"
  },
  securityContent: {
    marginTop: 0,
  },
  inputDisabled: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 16,
    borderColor: '#d1d5db',
    borderWidth: 1,
    color: '#888',
  },
  
});
