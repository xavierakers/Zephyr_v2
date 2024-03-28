import React, { useState, useEffect } from 'react';
import { LOCAL_BASE_URL } from '../../config';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../helperFunctions/AuthContext';

import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator,
  ScrollView, KeyboardAvoidingView, Alert, Platform, } from 'react-native';

const CreateGroup = () => {
    const navigation = useNavigation();

    const {token} = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const [groupId, setGroupId] = useState('');
    const [groupName, setGroupName] = useState('');
    const [groupType, setGroupType] = useState('');
    const [groupBio, setGroupBio] = useState('');
    const [groupPic, setGroupPic] = useState('default_group.jpg');


    const handleCreateGroup = async() => {
        const endpoint = '/create_group';
        const url = `${LOCAL_BASE_URL}${endpoint}`;
        try{
            setLoading(true)

            const reponse = await fetch(url, {
                method: 'POST',
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: groupName,
                    bio: groupBio,
                    group_pic: groupPic,
                    group_type: groupType

                }),
            });
        
            setLoading(false);

            if(reponse.ok) {
                const data = await reponse.json();
                setGroupId(data.group_id)
                console.log(groupId);
                navigation.navigate('InitialInviteMembersScreen');
                //navigation.navigate('Main');
            } else if (reponse.status == 500) {
                console.log('Failed creating group');
                setError('Invalid Group');
            } else {
                setError('Network response error');
            }
        } catch (error) {
            setLoading(false)
            console.error('An error occurred during group creation:', error);
        }
    };

    return (
<KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
    <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
            <Button title="< Back" onPress={() => navigation.navigate('Main')} />
            <Text style={styles.title}>Create Group</Text>
            <Text>*Group Name:</Text>
            <TextInput style={styles.inputField}
                placeholder='Name'
                value = {groupName}
                onChangeText={setGroupName}
            />
            <Text>*Group Type:</Text>
            <TextInput style={styles.inputField}
                placeholder='Group Type'
                value = {groupType}
                onChangeText={setGroupType}
            />
            <Text>Group Bio:</Text>
            <TextInput style={styles.inputField}
                placeholder='Username'
                value = {groupBio}
                onChangeText={setGroupBio}
            />
            <Text>Group photo // change this to an upload photo instead of input text</Text>

            <TextInput style={styles.inputField}
                placeholder='Group Photo'
                value = {groupPic}
                onChangeText={setGroupPic}
            />
            <Button title="Next >" onPress={handleCreateGroup} />
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
    },
      errorText: {
      color: 'red',
      marginTop: 10,
    },
  });
export default CreateGroup;