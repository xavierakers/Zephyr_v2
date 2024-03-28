import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LOCAL_BASE_URL } from '../../config';
import { useAuth } from '../../helperFunctions/AuthContext';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet, 
    ScrollView, KeyboardAvoidingView } from 'react-native';

const RegisterPhone = () => {

    const { token } = useAuth();

    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const [phoneNum, setPhoneNum] = useState();

    const [message, setMessage] = useState('');
    const [error, setError] = useState();

    const handleRegisterPhone = async () => {

        //will create new API route to handle SMS verification
        //firebase SMS verification is not free so we are skipping this
        const endpoint = '/account';
        const url = `${LOCAL_BASE_URL}${endpoint}`;

        try{
            setLoading(true);
            const response = await fetch (url, {
                method: 'PUT',
                headers:{
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
                    body: JSON.stringify({
                        phone_num: phoneNum
                    }),
            });

            setLoading(false);

            if(response.ok){
                const data = await response.json;
                setMessage(data.message);
                console.log(message)
                navigation.navigate('Main');
            } else if(response.status == 500) {
                console.log('Error adding phone number');
            } else {
                setError('Network response error');
            }
        } catch (error) {
            setLoading(false);
            console.error('An error occured');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.container}>
                    <Text style={styles.title}>Zephyr</Text>
                    <Text style={{fontSize: 24 }}>Register Phone num</Text>
                    <Text>Ener your phone number for account recovery and two-factor authentication</Text>
                    <TextInput style={styles.inputField}
                        placeholder='Phone Number'
                        value = {phoneNum}
                        onChangeText={setPhoneNum}
                    />
                    <Text>change this to switch between maybe later and next if the user inputs anything in a box</Text>
                    <Button title="MaybeLater/Next >" onPress={handleRegisterPhone} />
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

export default RegisterPhone;