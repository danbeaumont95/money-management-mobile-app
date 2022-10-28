import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import UserService from '../Services/user';
import LoginModal from './LoginModal';

const Login = ({ changeType }: any) => {
  const [showModal, setShowModal] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = (data: { email: string, password: string; }) => {

    const { email, password } = data;
    UserService.login(email, password)
      .then((res) => {
        console.log(res.data, 'DATA123');
        if (res.data.error) {
          setShowModal(true);
          setModalVisible(true);
          setModalText(res.data.error);
        }

        if (res.data.access_token) {
          // res.data.refresh_token
          setShowModal(true);
          setModalVisible(true);
          setModalText('Logged in!');
        }
      })
      .catch((err) => {
        console.log(err, 'err123');
        setShowModal(true);
        setModalVisible(true);
        setModalText('Wrong login details!');
      });
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  console.log(isModalVisible, 'isModalVisible in Login');

  return (
    <View style={styles.container}>
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
  }
});
