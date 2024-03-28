import React, { useState, useEffect } from 'react';
import { LOCAL_BASE_URL } from '../../config';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../helperFunctions/AuthContext';
import fetchApiData from '../../helperFunctions/fetchApiData';

import { View, Text, TextInput, Button, StyleSheet,
    ScrollView, KeyboardAvoidingView, ActivityIndicator, FlatList,
    RefreshControl } from 'react-native';

//A tab on the HomeNavigator
const ProfileScreen = () => {
    const [refreshing, setRefreshing] = React.useState(false);
    const navigation = useNavigation();
    
    //To retreive user token, use token
    const { token, storeToken, removeToken } = useAuth();

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState();
    const [error, setError] = useState(null);
    
    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const endpoint = '/account';
        const url = `${LOCAL_BASE_URL}${endpoint}`;
        try{
            if(token){
                const data = await fetchApiData(token, url);
                console.log(data);
                setLoading(false);
            } else {
                setMessage('Not authenticated');
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setMessage('Error fetching data');
            setLoading(false);
        }
    };
    
    const handleLogout = async () => {
        const endpoint = '/logout';
        const url = `${LOCAL_BASE_URL}${endpoint}`;
        try{
            setLoading(true)
            const response = await fetch(url,{
                method: 'GET',
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
            });

            setLoading(false);
            
            if(response.ok){
                removeToken();
                navigation.navigate('Intro')
            } else if (response.status == 500){
                console.log('Error');
                setError('Error logging out');
            } else {
                setError('Network response error');
            }
        }catch (error){
            setLoading(false);
            console.log('Network error');
            console.error('An error occurred during logout:', error);
        }
    };


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchData();
        setTimeout(() => {
          setRefreshing(false);
        }, 1000);
      }, []);


    //Makes sure all the data is collected before displaying anything
    if (loading) {
        return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
      );
    }
      
    
    return(
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView
            contentContainerStyle={styles.scrollContent}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
            
                <View style={styles.container}>
                    <Text>SettingsScreen</Text>
                    <Text>User Info</Text>
                    <Text>{message}</Text>
                    <Text>This is where we can display user info.</Text>
                    <Text>The users data is stored in the variable "data". It is in json structure and you can view it in the console.</Text>
                    <Button title="Logout" onPress={ handleLogout }/>
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
  

export default ProfileScreen;