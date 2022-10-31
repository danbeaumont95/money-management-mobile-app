import { View, Text } from "react-native";
import React, { useCallback, useEffect } from 'react';
import UserService from "../Services/user";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Main = () => {
  const getTransactions = useCallback(async () => {
    const token = await AsyncStorage.getItem('access_token');

    await UserService.getAllTransactions(token, 'month')
      .then((res) => {
        console.log(res, 'res ge4t all transactions');
      })
      .catch((err) => {
        console.log(err, 'err123');
      });
  }, []);
  useEffect(() => {
    getTransactions();
  }, []);
  return (
    <View>
      <Text>Dan</Text>
    </View>
  );
};

export default Main;
