import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';
import Main from './Main';
import Transaction from './Transaction';
import PlaidLink from './PlaidScreen';
import Profile from './Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './Home';
import Login from './Login';

const Tab = createBottomTabNavigator();

function MyTabs() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const getAcessToken = async () => {

      const token = await AsyncStorage.getItem('access_token');

      if (!token) {
        setLoggedIn(false);
      }
      else {
        setLoggedIn(true);
      };
      // await AsyncStorage.removeItem('access_token');
      // setLoggedIn(false);
    };

    getAcessToken();

  }, []);

  if (!loggedIn) return <Home />;
  return (

    <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: '#1A1C46' } }} initialRouteName="Transactions" >
      <Tab.Screen name="Profile" component={Profile} options={{ tabBarActiveTintColor: '#FC0086' }} />
      <Tab.Screen name="Transactions" component={Main} options={{ tabBarActiveTintColor: '#FC0086' }} />
    </Tab.Navigator>
  );
}

export default MyTabs;
