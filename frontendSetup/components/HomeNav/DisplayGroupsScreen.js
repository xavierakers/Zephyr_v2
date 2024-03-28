import React, { useState, useEffect } from 'react';
import { LOCAL_BASE_URL } from '../../config';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../helperFunctions/AuthContext';
import fetchApiData from '../../helperFunctions/fetchApiData';

import { View, Text, TextInput, Button, StyleSheet,
  ScrollView, KeyboardAvoidingView, ActivityIndicator, FlatList,
  RefreshControl } from 'react-native';

const DisplayGroups = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const navigation = useNavigation();

  const { token, storeToken, removeToken } = useAuth();

  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState();
  const [error, setError] = useState(null);
  
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const endpoint = '/users_groups';
    const url = `${LOCAL_BASE_URL}${endpoint}`

    try{
        if (token){
            const data = await fetchApiData(token, url);
            setData(data);
            console.log(data);
            setLoading(false);
        } else if (response.status == 500){
            setMessage('Not authenticated');
            setLoading(false);
        } else {
            setError('Network error');
        }
    } catch (error) {
        console.log(error);
        setMessage('Error fetching data');
        setLoading(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
    setTimeout(() => {
    setRefreshing(false);
    }, 1000);
  }, []);


  if (loading) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
        </View>
    );
  }
      
    
  return(
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContent} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={styles.container}>
          <Text>Your Groups</Text>
          <Text>Users groups can be put here</Text>
          <Text>{message}</Text>
          <Text>This is where we can display users groups</Text>
          <Text>The users groups are stored in the variable "data". It is in json structure and you can view it in the console.</Text>
          <Button title="Create Group" onPress={() => navigation.navigate('CreateGroup')}/>
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

export default DisplayGroups;