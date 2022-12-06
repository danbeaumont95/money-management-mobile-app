import { Platform, View, Text, StyleSheet, ScrollView, Button, Pressable, Alert } from 'react-native';
import React from 'react';
import MyTabs from './Tabs';
import { NavigationContainer } from '@react-navigation/native';


const LoggedInScreen = () => {
  return (
    <View>
      <Text>Text</Text>
      <NavigationContainer independent={true}>
        <MyTabs />
      </NavigationContainer>
    </View>
  );
};

export default LoggedInScreen;
