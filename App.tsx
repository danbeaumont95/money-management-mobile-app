import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './Components/Home';
import Login from './Components/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './Components/Profile';
import PlaidScreen from './Components/PlaidScreen';
import React from 'react';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    // <View style={styles.container}>
    <NavigationContainer>

      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
        // options={{ title: 'Welcome' }}
        />

        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name='PlaidLink' component={PlaidScreen} />
      </Stack.Navigator>

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
