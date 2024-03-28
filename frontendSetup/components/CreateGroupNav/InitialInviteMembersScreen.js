import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LOCAL_BASE_URL } from '../../config';
import { useAuth } from '../../helperFunctions/AuthContext';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet, 
    ScrollView, KeyboardAvoidingView } from 'react-native';
import fetchApiData from '../../helperFunctions/fetchApiData';

const InitialInviteMembers = ()=> {
    const navigation = useNavigation();

    const { token } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState();

    const[friends, setFriends] = useState([]);

    /*
    useEffect(() => {
        
    }, []);
    */

    const handleShowFriends = async () => {
        const endpoint = '/friends'
        const url = `${LOCAL_BASE_URL}${endpoint}`
        try{
            if(token){
                const data = await fetchApiData(token, url);
                console.log(data);
                setFriends(data);
                setLoading(false);
            } else if(Response.status == 500){
                setMessage('Not authenticated');
                setLoading(false);
            } else {
                setError('Network error');
            }
        } catch (error) {
            console.log('Error fetching data:', error);
            setMessage('Error fetching data');
            setLoading(false);
        }
       
    }

    const handleInviteFriends = async () => {
        const endpoint = '/invite_friend'
        const url = `${LOCAL_BASE_URL}${endpoint}`
    

    }


    return(
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.container}>
                    <Text>Successfully created Group</Text>
                    <Text>Invite Members</Text>
                    
                    <Text>Add users you are linked with</Text>
                    <Button title='Invite friend' onPress={handleShowFriends} />
                    <Text>Members</Text>
                    <Text>The users friend data is stored in the variable "data". It is in json structure and you can view it in the console.</Text>
                    <Button title="Next >" /*onPress={ InitialInviteLink }*/ onPress={() => navigation.navigate('Main')}/>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )

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
    },
      errorText: {
      color: 'red',
      marginTop: 10,
    },
  });

export default InitialInviteMembers;