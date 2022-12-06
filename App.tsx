import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './Components/Home';
import Login from './Components/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './Components/Profile';
import PlaidScreen from './Components/PlaidScreen';
import React from 'react';
import Main from './Components/Main';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MyTabs from './Components/Tabs';
import LoggedInScreen from './Components/LoggedInScreen';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    // <NavigationContainer>

    //   <Stack.Navigator
    //     screenOptions={{
    //       headerShown: false
    //     }}
    //   >
    //     <Stack.Screen
    //       name="Home"
    //       component={Home}
    //     />

    //     <Stack.Screen name="Profile" component={Profile} />
    //     <Stack.Screen name='PlaidLink' component={PlaidScreen} />
    //     <Stack.Screen name='Main' component={Main} />
    //     <Stack.Screen name='LoggedInScreen' component={LoggedInScreen} />
    //   </Stack.Navigator>

    // </NavigationContainer>
    <NavigationContainer independent={true} >
      <MyTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
