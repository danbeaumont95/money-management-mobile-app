import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Main from './Main';
import Transaction from './Transaction';
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Main" component={Main} />
      <Tab.Screen name="Settings" component={Transaction} />
    </Tab.Navigator>
  );
}

export default MyTabs;
