import React, { useState, useEffect } from 'react';
import { LOCAL_BASE_URL } from '../../config';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../helperFunctions/AuthContext';
import fetchApiData from '../../helperFunctions/fetchApiData';

import { View, Text, TextInput, Button, StyleSheet,
  ActivityIndicator, ScrollView, KeyboardAvoidingView, Alert, Platform,
  RefreshControl } from 'react-native';

const Home = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const navigation = useNavigation();

  const { token } = useAuth();

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState();
  const [error, setError] = useState(null);

  
  //As of right now, all the api does when it recieves a token is return a 'message'
  //This will be changed later when we implment more thing
  //Moreover, a placeholder
  useEffect(() => {
    const fetchData = async () => {
      const endpoint = '/home';
      const url = `${LOCAL_BASE_URL}${endpoint}`;
      try{
        if(token) {
        const data = await fetchApiData(token, url);
        console.log(data);
        setMessage(data.message);
        setLoading(false)
        } else {
          setMessage('Not authenticated');
          setLoading(false);
        }
      } catch (error) {
        //setMessage('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);
  
/*
  const fetchData = async () => {
    const endpoint = '/home';
    const url = `${LOCAL_BASE_URL}${endpoint}`;
    try{
      if(token) {
      const data = await fetchApiData(token, url);
      console.log(data);
      setMessage(data.message);
      setLoading(false)
      } else {
        setMessage('Not authenticated');
        setLoading(false);
      }
    } catch (error) {
      //setMessage('Error fetching data');
      setLoading(false);
    }
  };
*/
  //Pull down to refresh
  //Fetches new data from api
  //Implemented into every screen
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    //fetchData();
    setTimeout(() => {
    setRefreshing(false);
    }, 1000);
  }, []);


//Waits for data to finish loading before 
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }} >
      <ScrollView contentContainerStyle={styles.scrollContent} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View>
        <Text style={styles.text}>{message}</Text>
        <Text>Other info will go here</Text>
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
    fontWeight: 'bold'
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
  text:{
    fontSize: 24,
    fontWeight: 'bold'
  }
});

export default Home;