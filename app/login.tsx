import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  const handleLogin = () => {
    // Here you’d normally check credentials and store auth state
    
    router.replace('/(auth)/(tabs)');  // This redirects to the tab navigation screen under (tabs)
  };

  return (
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/mp-header-logo.jpg')}
            style={styles.headerLogo}
          />
        }>

        <View style={styles.container}>
            <Text style={styles.title}>Login 🔒</Text>

            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                autoCapitalize="none"
                onChangeText={setUsername}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                secureTextEntry={secureText}
                onChangeText={setPassword}
            />

            <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                <Text style={styles.toggleText}>
                    {secureText ? 'Show' : 'Hide'} Password
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
        </View>
        
      </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
  headerLogo: {
    height: 200,
    width: 430,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 32,
    textAlign: 'center',
    color: 'white',
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
  },
  toggleText: {
    textAlign: 'right',
    color: '#6b7280',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '500',
  },
});
