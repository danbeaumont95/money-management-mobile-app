import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import Login from './Login';
import SignUp from './Signup';

const Home = () => {
  const [type, setType] = useState('login');

  const changeType = (passedType: string) => {
    return passedType === 'login' ? setType('login') : setType('signup');
  };

  return (
    <View style={styles.container}>
      {type === 'login' ? (
        <Login changeType={changeType} />
      ) :
        (
          <SignUp changeType={changeType} />
        )
      }

    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1D1D1D',
    height: '100%',
    width: '100%'
  }
});
