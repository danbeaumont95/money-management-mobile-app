import { link } from 'fs';
import React, { useState, useEffect, useCallback } from 'react';
import { Platform, View, Text, StyleSheet, ScrollView, Button, Pressable, Alert } from 'react-native';
import { PlaidLink, LinkExit, LinkSuccess } from 'react-native-plaid-link-sdk';
import UserService from '../Services/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PlaidHome = ({ navigation }: any) => {
  const [linkToken, setLinkToken] = useState('');
  const [accessToken, setAccessToken] = useState<string | null>('');
  const address = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';

  const createLinkToken = useCallback(async () => {
    const token = await AsyncStorage.getItem('access_token');
    setAccessToken(token);
    await UserService.getLinkToken(token)
      .then((data: any) => {
        setLinkToken(data.data.token);
      })
      .catch((err) => {
        console.log(err, 'err23');
      });
  }, [setLinkToken]);

  useEffect(() => {
    if (!linkToken) {
      createLinkToken();
    }
  }, [linkToken]);


  const handleSuccess = (success: LinkSuccess) => {
    if (success.publicToken) {

      UserService.exchangePublicTokenForAccesstoken(accessToken, success.publicToken)
        .then((res) => {
          if (res.data.accessToken) {
            AsyncStorage.setItem('encoded_plaid_access_token', res.data.accessToken).then((res) => {

              Alert.alert('Success', 'Account linked', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
              ]);
            });
          }
          else {
            Alert.alert('Error', 'Unable to link bank account', [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
          }
        })
        .catch((err) => {
          console.log(err, 'err123');
        });
    }
  };

  return (
    <View style={{ flex: 1 }}>

      <View style={styles.bottom}>
        <ScrollView style={{ height: 100, zIndex: 100000 }}>

          <PlaidLink
            tokenConfig={{ token: linkToken, noLoadingState: false }}
            onSuccess={(success: LinkSuccess) => handleSuccess(success)}
            onExit={(exit: LinkExit) => console.log(exit, 'exist123')}
          >
            <Text style={styles.buttonText}>Connect a bank account</Text>
          </PlaidLink>

        </ScrollView>


      </View>
    </View>
  );
};

export default PlaidHome;

const styles = StyleSheet.create({
  heading: {
    alignItems: 'center',
    paddingHorizontal: 32,
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingBottom: 32,
  },
  body: {
    flex: 1,
    paddingHorizontal: 32,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  baseText: {
    fontSize: 16,
    marginTop: 8,
    color: '#4B4B4B',
    textAlign: 'left',
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 36,
    marginHorizontal: 10,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    paddingBottom: 32,
  },
  buttonContainer: {
    elevation: 4,
    backgroundColor: '#000',
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  buttonText: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 17,
    paddingHorizontal: 32,
    elevation: 3,
    backgroundColor: '#FC0086',
    fontSize: 19,
    height: 60,
    width: 270,
    marginTop: 40,
    color: 'white',
    display: 'flex'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#FC0086',

    height: 60,
    width: 270,
    marginTop: 20
  },
});
