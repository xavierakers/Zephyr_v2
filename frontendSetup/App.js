import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthProvider, useAuth } from './helperFunctions/AuthContext';

//All the screens
import Intro from './components/LoginRegisterNav/IntroScreen';
import Login from './components/LoginRegisterNav/LoginScreen';
import Register from './components/LoginRegisterNav/RegisterScreen';
import RegisterAdditionalInfo from './components/LoginRegisterNav/RegisterAdditionalInfo';
import RegisterPhone from './components/LoginRegisterNav/RegisterPhone'

import Home from './components/HomeNav/HomeScreen';
import Profile from './components/HomeNav/ProfileScreen';


import CreateGroup from './components/CreateGroupNav/CreateGroupScreen';
import InitialInviteMembers from './components/CreateGroupNav/InitialInviteMembersScreen'
import DisplayGroups from './components/HomeNav/DisplayGroupsScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


//This is supposed to make it so if there is a token stored then when the app opens it goes straight to the MainNavigator ie. Home and such
//Can't tell tho since we're running on expo go
/*const App = () => {
  const { token } = useAuth();
  console.log(token)
  return (
    <AuthProvider>
      <NavigationContainer>
        { token ? <MainNavigator /> : <LoginRegisterNavigator />}
      </NavigationContainer>
    </AuthProvider>
  );
};
*/

//Login&Register stack
const LoginRegisterNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Intro"
                    component={Intro}
                    options={{ headerShown: false }}
                    />
      <Stack.Screen name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                    />
      <Stack.Screen name="Register"
                    component={Register}
                    options={{ headerShown: false }}
                    />
      <Stack.Screen name="RegisterAdditionalInfo"
                    component={RegisterAdditionalInfo}
                    options={{ headerShown: false }}
                    />
      <Stack.Screen name="RegisterPhoneNum"
                    component={RegisterPhone}
                    options={{ headerShown: false }}
                    />
    </Stack.Navigator>
  )
}


//Everything else once logged in
//Put main things in tabs
const HomeNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name = "Home"
                  component={Home}
                  options={{ headerShown: false }}
      />
      <Tab.Screen name = "Groups"
                  component={DisplayGroups}
                  options={{ headerShown: false }}
      />
      <Tab.Screen name = "Profile"
                  component={Profile}
                  options={{ headerShown: true }} />
    </Tab.Navigator>
  )
}

const CreateGroupNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="CreateGroupScreen">
      <Stack.Screen name="CreateGroupScreen"
                    component={CreateGroup}
                    options={{ headerShown: false }}
                    />
      <Stack.Screen name="InitialInviteMembersScreen"
                    component={InitialInviteMembers}
                    options={{ headerShown: false }}
                    />
    </Stack.Navigator>
  )
}

export default () => {
  return(
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginRegister">
          <Stack.Screen
            name="LoginRegister"
            component={LoginRegisterNavigator}
            options={{ headerShown: false}}
          />
          <Stack.Screen 
            name="Main"
            options={{ headerShown: false}}
            component={HomeNavigator}
          />
          <Stack.Screen
            name="CreateGroup"
            component={CreateGroupNavigator}
            options={{ headerShown: false}}
            />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};
