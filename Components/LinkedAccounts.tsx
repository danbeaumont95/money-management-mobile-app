import React, { useEffect, useState } from 'react';
import { View, Text, Alert, FlatList, StyleSheet, Dimensions } from 'react-native';
import UserService from '../Services/user';
import { LinkedAccount } from '../Services/interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getSymbolFromCurrency from 'currency-symbol-map';
import { FontAwesome } from '@expo/vector-icons';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const LinkedAccounts = () => {
  const [accessToken, setAccessToken] = useState('');
  const [accounts, setAccounts] = useState<LinkedAccount[]>([]);

  useEffect(() => {
    const getAccessToken = async () => {
      const token = await AsyncStorage.getItem('access_token');
      if (token) {
        setAccessToken(token);
      }
    };

    const getLinkedAccounts = async () => {
      if (!accessToken) console.log('no access token');
      await UserService.getLinkedAccounts(accessToken)
        .then((res) => {
          if (!res.data.accounts) {
            return Alert.alert('Error', `No accounts found`, [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
          }
          else {
            setAccounts(res.data.accounts);
          }
        });
    };

    getAccessToken();
    getLinkedAccounts();
  }, [accessToken]);

  console.log(accounts, 'accounts123');
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Linked accounts</Text>
      <FlatList data={accounts} renderItem={({ item, index }) => {
        return (
          <View key={index} style={styles.account}>
            <FontAwesome name="bank" size={58} color="#CBD3F7" style={{ flexBasis: '20%' }} />
            <View style={styles.nameAndBalance}>

              <Text style={styles.text}>
                {item.name}
              </Text>
              <Text style={styles.text}>
                {getSymbolFromCurrency(item.balances.iso_currency_code)}
                {item.balances.available}
              </Text>
            </View>
          </View>
        );
      }} />
    </View >
  );
};

export default LinkedAccounts;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1A1C46',
    alignItems: 'center',
    justifyContent: 'center',
    height: height
  },
  title: {
    color: '#CBD3F7',
    fontSize: 24,
    margin: 0,
    padding: 0,
    top: 60
  },
  text: {
    color: '#CBD3F7',
    fontSize: 24,
    margin: 0,
    padding: 0
  },
  account: {
    borderColor: '#FC0086',
    borderWidth: 0.17,
    padding: 15,
    top: 100,
    width: width,
    display: 'flex',
    flexDirection: 'row'
  },
  nameAndBalance: {
    flexBasis: '80%',
    marginLeft: 20,
    justifyContent: 'center',
    alignContent: 'center'
  }
});
