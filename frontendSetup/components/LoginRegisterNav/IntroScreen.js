import React, { useState, useEffect } from 'react';
import { LOCAL_BASE_URL } from '../../config';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../helperFunctions/AuthContext';
import fetchApiData from '../../helperFunctions/fetchApiData';

import { View, Text, TextInput, Button, StyleSheet,
    ScrollView, KeyboardAvoidingView, ActivityIndicator, FlatList,
    RefreshControl } from 'react-native';

const Intro = () => {
    const navigation = useNavigation();

    useEffect(() => {

    }, []);

    return (
        //do as you with with the rendering of all the screens, i did the bare minimum for testing
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.container}>
              <Text style={styles.title}>Zephyr</Text>
              <Button title="Log In with Email" onPress={() => navigation.navigate('Login')} />
              <Text>or</Text>
              <Button title="Create an Account" onPress={() => navigation.navigate('Register')} />
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
    },
      errorText: {
      color: 'red',
      marginTop: 10,
    },
  });
  
  export default Intro;