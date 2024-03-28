import React, { useState, useEffect } from 'react';
import { LOCAL_BASE_URL } from '../../config';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../helperFunctions/AuthContext';

import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator,
  ScrollView, KeyboardAvoidingView, Alert, Platform, } from 'react-native';

const Login = () => {
  const navigation = useNavigation();

  const { token, storeToken } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    console.log(token)
  }, [token]);


  const handleLogin = async () => {
    const endpoint = '/login';
    const url = `${LOCAL_BASE_URL}${endpoint}`;

    try{
      setLoading(true)

      //Sends email and password to login route
      //Returns token
      const response = await fetch(url,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      setLoading(false);
      //When api sends response code 200
      //200 indicates proper data was sent
      if (response.ok) {
        const data = await response.json();
        storeToken(data.token);
        navigation.navigate('Main');
      } else if (response.status == 500) {
        setError('Invalid login'); // Set the error message for a 500 status
      } else {
        setError('Network response error');
      } 
    }catch (error){
      setLoading(false)
      console.error('An error occurred during login:', error);
    }
  };

  return (
    //do as you with with the rendering of all the screens, i did the bare minimum for testing
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
    <ScrollView contentContainerStyle={styles.scrollContent}>
    <View style={styles.container}>
      <Button title="< Back" onPress={() => navigation.navigate('Intro')} />
      <Text style={styles.title}>Zephyr</Text>
      <Text style={{fontSize: 24 }}>Login Screen</Text>
      <TextInput style={styles.inputField}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput style={styles.inputField}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Log In" onPress={handleLogin} />
      {loading && <ActivityIndicator size="small" color="#0000ff" />}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );



};
//same here, please change these
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  inputField:{
    fontSize: 16,
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: '#696969',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10

  },
  scrollContent: {
   flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
    errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default Login;