import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://43.204.82.81:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.message === 'Login successful') {
        navigation.navigate('Home');
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome Back!</Text>
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'center', alignItems: 'center', opacity: 0.9 },
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', padding: 20, backgroundColor: 'rgba(0, 0, 128, 0.7)' },
  title: { fontSize: 30, fontWeight: 'bold', color: '#ffffff' },
  input: { width: '100%', padding: 15, marginVertical: 10, borderRadius: 5, backgroundColor: '#ffffff' },
  button: { backgroundColor: '#007bff', padding: 15, borderRadius: 5, width: '100%' },
  buttonText: { textAlign: 'center', color: '#ffffff', fontWeight: 'bold' },
  link: { marginTop: 10 },
  linkText: { color: '#007bff' },
});

export default LoginScreen;
