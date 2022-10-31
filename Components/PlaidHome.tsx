import { link } from 'fs';
import React, { useState, useEffect, useCallback } from 'react';
import { Platform, View, Text, StyleSheet, ScrollView, Button, Pressable } from 'react-native';
import { PlaidLink, LinkExit, LinkSuccess } from 'react-native-plaid-link-sdk';
import UserService from '../Services/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PlaidHome = ({ navigation }: any) => {
  console.log(navigation, 'navigation111');
  const [linkToken, setLinkToken] = useState('');
  const [accessToken, setAccessToken] = useState<string | null>('');
  const address = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';

  const createLinkToken = useCallback(async () => {
    const token = await AsyncStorage.getItem('access_token');
    console.log(token, 'tokentokentoken');
    setAccessToken(token);
    console.log(token, 'tokentokentoken2');
    await UserService.getLinkToken(token)
      .then((data: any) => {
        console.log(data.data, 'data111');
        setLinkToken(data.data.token);
        console.log(data.data.token, '2o2');
        console.log('ohaveset');
      })
      .catch((err) => {
        console.log(err, 'err23');
      });
  }, [setLinkToken]);

  useEffect(() => {
    console.log(linkToken, 'linkToken123');
    if (!linkToken) {
      createLinkToken();
    }
  }, [linkToken]);

  console.log(linkToken, 'linkToken123');

  const handleSuccess = (success: LinkSuccess) => {
    if (success.publicToken) {

      UserService.exchangePublicTokenForAccesstoken(accessToken, success.publicToken)
        .then((res) => {
          console.log(res, 'resExchange');
        })
        .catch((err) => {
          console.log(err, 'err123');
        });
    }
  };

  return (
    <View style={{ flex: 1 }}>

      <View style={styles.bottom}>
        {/* <TestPlaid /> */}
        <ScrollView style={{ borderColor: 'red', borderWidth: 2, height: 100, zIndex: 100000 }}>

          <PlaidLink
            tokenConfig={{ token: linkToken, noLoadingState: false }}
            // onSuccess={(success: LinkSuccess) => console.log(success, 'sucesss123')}
            onSuccess={(success: LinkSuccess) => handleSuccess(success)}
            onExit={(exit: LinkExit) => console.log(exit, 'exist123')}
          >
            {/* <Text>Add Account</Text> */}
            {/* <Pressable style={styles.button} > */}
            <Text style={styles.buttonText}>Connect a bank account</Text>
            {/* </Pressable> */}
          </PlaidLink>

        </ScrollView>
        <Button
          title="Back to PlaidLink"
          onPress={() =>
            navigation.navigate('PlaidLink', { name: 'Jane' })
          }
        />

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
    // fontSize: 20,
    // color: '#FFF',
    // backgroundColor: '#000',
    // fontWeight: 'bold',
    // alignSelf: 'center',
    // textTransform: 'uppercase',
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    // color: 'white',
    color: 'black',
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
