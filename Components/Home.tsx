import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import Login from './Login';
import SignUp from './Signup';
import React from 'react';
const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height

const Home = ({ navigation }: any) => {
  const [type, setType] = useState('login');

  const changeType = (passedType: string) => {
    return passedType === 'login' ? setType('login') : setType('signup');
  };

  return (
    <ScrollView style={styles.container} >
      {type === 'login' ? (
        <Login changeType={changeType} navigation={navigation} />
      ) :
        (
          <SignUp changeType={changeType} />
        )
      }

    </ScrollView>

  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#1D1D1D',
    height: '100%',
    // height: height,
    width: '100%'
  }
});
