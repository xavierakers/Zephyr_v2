import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LOCAL_BASE_URL } from '../../config';
import { useAuth } from '../../helperFunctions/AuthContext';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet, 
    ScrollView, KeyboardAvoidingView } from 'react-native';

const RegisterAdditionalInfo = () => {

    const { token } = useAuth();

    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const [bio, setBio] = useState(null);
    const [gender, setGender] = useState(null);
    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [weightUnit, setWeightUnit] = useState(null);
    const [profilePicURL, setProfilePicURL] = useState('default.jpg');

    const [message, setMessage] = useState('');

    const handleRegisterAdditionalInfo = async () => {
        const endpoint = '/account'
        const url = `${LOCAL_BASE_URL}${endpoint}`

        try {
            setLoading(true);
            const response = await fetch(url, {
                method: 'PUT',
                headers:{
                    Authorization: token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                    body: JSON.stringify({
                        bio: bio,
                        gender: gender,
                        height: height,
                        weight: weight,
                        weight_unit: weightUnit,
                        profile_pic: profilePicURL
                    }),
            });

            setLoading(false);

            if (response.ok){
                const data = await response.json();
                setMessage(data.message);
                console.log(data);
                navigation.navigate('RegisterPhoneNum');                
            } else {
                console.log('Failed adding additional into');
            }
        } catch (error) {
            setLoading(false);
            console.error('An error occured while updating info', error);
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
                    <Text style={{fontSize: 24 }}>Adding Additional Info</Text>
                    <Text>Not required to fill any/all boxes</Text>
                    <TextInput style={styles.inputField}
                        placeholder='Bio'
                        value = {bio}
                        onChangeText={setBio}
                    />
                    <Text>Make this a drop down i think</Text>
                    <TextInput style={styles.inputField}
                        placeholder='Gender'
                        value = {gender}
                        onChangeText={setGender}
                    />
                    <Text>Check out wireframe, will be two ints, and then combine the ints</Text>
                    <TextInput style={styles.inputField}
                        placeholder='Height'
                        value = {height}
                        onChangeText={setHeight}
                    />
                    <TextInput style={styles.inputField}
                        placeholder='Weight'
                        value = {weight}
                        onChangeText={setWeight}
                    />
                    <Text>Check out wireframe, this will be a drop down</Text>
                    <TextInput style={styles.inputField}
                        placeholder='Weight Unit'
                        value = {weightUnit}
                        onChangeText={setWeightUnit}
                    />
                    <Text>change this to switch between maybe later and next if the user inputs anything in a box</Text>
                    <Button title="MaybeLater/Next >" onPress={handleRegisterAdditionalInfo} />
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

export default RegisterAdditionalInfo;