import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LOCAL_BASE_URL } from '../../config';
import { useAuth } from '../../helperFunctions/AuthContext';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet, 
    ScrollView, KeyboardAvoidingView } from 'react-native';

const Register = () => {

    const { storeToken } = useAuth();
    
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [birthday, setBirthday] = useState([]);


    //Submitting the data from text fields when button is pressed
    //Retrieves token from api and stores it
    const handleRegister = async () => {
        const endpoint = '/register';
        const url = `${LOCAL_BASE_URL}${endpoint}`;
    
        try {
            setLoading(true);
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        first_name: firstName,
                        last_name: lastName,
                        username: username,
                        birthday: birthday,
                }),
            });

            setLoading(false);

            if (response.ok){
                const data = await response.json();
                storeToken(data.token)
                console.log('Register success')
                navigation.navigate('RegisterAdditionalInfo');
            }else {
                console.log('Registration failed');
            }
        } catch (error) {
            setLoading(false);
            console.error('An error occurred during registration:', error)
        }
    };


    return (
        <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.container}>
                    <Button title="< Back" onPress={() => navigation.navigate('Intro')} />
                    <Text style={styles.title}>Zephyr</Text>
                    <Text style={{fontSize: 24 }}>Register</Text>
                    <TextInput style={styles.inputField}
                        placeholder='First Name'
                        value = {firstName}
                        onChangeText={setFirstName}
                    />
                    <TextInput style={styles.inputField}
                        placeholder='Last Name'
                        value = {lastName}
                        onChangeText={setLastName}
                    />
                    <Text>Save this as an array/list</Text>
                    <TextInput style={styles.inputField}
                        placeholder='Birthday'
                        //value = {birthday}
                        //onChangeText={setBirthday}
                    />
                    <TextInput style={styles.inputField}
                        placeholder='Username'
                        value = {username}
                        onChangeText={setUsername}
                    />
                    <TextInput style={styles.inputField}
                        placeholder='Email'
                        value = {email}
                        onChangeText={setEmail}
                    />
                    <TextInput style={styles.inputField}
                        placeholder='Password'
                        secureTextEntry
                        value = {password}
                        onChangeText={setPassword}
                    />
                    <Button title="Create Account" onPress={handleRegister} />
                    {loading && <ActivityIndicator size="small" color="#0000ff" />}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

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
      }
  });

export default Register;