import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Button, Alert } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import UserService from '../Services/user';
import LoginModal from './LoginModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

const Login = ({ changeType, navigation }: any) => {
  console.log(navigation, 'navigation123');
  const [showModal, setShowModal] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false);

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
        console.log(res.data, 'DATA123');
        if (res.data.error) {
          // setShowModal(true);
          // setModalVisible(true);
          // setModalText(res.data.error);
          setShowLoadingSpinner(false);
          Alert.alert('Error', res.data.error, [
            // {
            //   text: 'Cancel',
            //   onPress: () => console.log('Cancel Pressed'),
            //   style: 'cancel',
            // },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);
        }

        if (res.data.access_token) {
          setShowModal(true);

          AsyncStorage.setItem('access_token', res.data.access_token).then((res) => {
            console.log('saved access_token');
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

  console.log(isModalVisible, 'isModalVisible in Login');

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

        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder='password'
              autoCapitalize='none'
            />
          )}
          name="password"
        />

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
