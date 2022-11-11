import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Button, Alert } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import UserService from '../Services/user';
import LoginModal from './LoginModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
// import {  } from 'react-native-'
import Ionicons from '@expo/vector-icons/Ionicons';
const Login = ({ changeType, navigation }: any) => {
  const [showModal, setShowModal] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = (data: { email: string, password: string; }) => {
    setShowLoadingSpinner(true);

    const { email, password } = data;
    UserService.login(email, password)
      .then((res) => {
        if (res.data.error) {
          setShowLoadingSpinner(false);
          Alert.alert('Error', res.data.error, [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);
        }

        if (res.data.access_token) {
          setShowModal(true);

          AsyncStorage.setItem('access_token', res.data.access_token).then((res) => {
          })
            .catch((err) => {
              console.log(err, 'err saving access_token');
            });
          AsyncStorage.setItem('refresh_token', res.data.refresh_token).then((res) => {
            setShowLoadingSpinner(false);
            navigation.navigate('PlaidLink', { name: 'Jane' });
          })
            .catch((err) => {
              console.log(err, 'err saving refresh_token');
            });

        }
      })
      .catch((err) => {
        console.log(err, 'err123');
        setShowModal(true);
        setModalVisible(true);
        setModalText('Wrong login details!');
        setShowLoadingSpinner(false);
      });
  };

  const handlePress = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <View style={styles.container}>
      <Spinner
        visible={showLoadingSpinner}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
        overlayColor={'rgba(00, 0, 0, 0.6)'}
      />
      <View style={{ height: 100 }}>

        <LoginModal isModalVisible={isModalVisible} setModalVisible={setModalVisible} modalText={modalText} />
      </View>
      <Text style={styles.title}>Money Management</Text>

      <View style={styles.buttonContainer}>

        <Pressable style={styles.switchTypeButton} onPress={() => changeType('login')}>
          <Text style={styles.text}>Login</Text>
        </Pressable>

        <Pressable style={styles.switchTypeButton} onPress={() => changeType('signup')}>
          <Text style={styles.text}>Sign Up</Text>
        </Pressable>
      </View>

      <View style={styles.formContainer}>

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder='email'
              autoCapitalize='none'
            />
          )}
          name="email"
        />
        {errors.email && <Text>This is required.</Text>}
        <View style={{ flexDirection: 'row' }}>

          <Controller
            control={control}
            rules={{
              maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.passwordInput}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder='password'
                autoCapitalize='none'
                secureTextEntry={hidePassword}
              />
            )}
            name="password"
          />

          {hidePassword ? (
            <Ionicons name="eye" size={32} style={{ top: 34, right: 45 }} onPress={handlePress} />
          ) :
            <Ionicons name="eye-off" size={32} style={{ top: 34, right: 45 }} onPress={handlePress} />
          }

        </View>

        <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.text}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    top: '25%'
  },
  title: {
    fontSize: 30,
    color: 'white',
  },
  input: {
    marginTop: 20,
    height: 60,
    width: 300,
    backgroundColor: 'white',
    borderRadius: 6,
    fontSize: 20,
    paddingLeft: 10
  },
  passwordInput: {
    marginTop: 20,
    height: 60,
    width: 300,
    backgroundColor: 'white',
    borderRadius: 6,
    fontSize: 20,
    paddingLeft: 10,
    // borderColor: 'red',
    // borderWidth: 4,
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginLeft: 33
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
    width: 300,
    marginTop: 20
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  switchTypeButton: {

    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#FC0086',

    height: 60,
    width: 140,
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10,
  },
  formContainer: {
    top: '5%',
    // borderColor: 'blue',
    // borderWidth: 5,
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    height: 60,
    borderWidth: 4,
    borderColor: 'red',
    width: 60,
    backgroundColor: 'white'
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
});
