import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Pressable, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import UserService from '../Services/user';
const width = Dimensions.get('window').width; //full width
const height = Dimensions.get('window').height; //full height

const SignUp = ({ changeType }: any) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      mobile_number: '',
      username: ''
    }
  });
  const onSubmit = (data: any) => {

    const { email, first_name, last_name, password, mobile_number, username } = data;
    UserService.signUp(first_name, last_name, email, password, mobile_number, username)
      .then((res) => {

        if (res.data.error) {
          // SWAL
        }
        if (res.data.email) {
          // SWAL
        }
      })
      .catch((err) => {
        console.log(err, 'err123');
      });
  };
  return (
    <View style={styles.container}>
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
              placeholder='First Name'
            />
          )}
          name="first_name"
        />
        {errors.first_name && <Text>This is required.</Text>}

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
              placeholder='Last Name'
            />
          )}
          name="last_name"
        />

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
              placeholder='Email'
            />
          )}
          name="email"
        />

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
              placeholder='mobile number'
            />
          )}
          name="mobile_number"
        />

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
              placeholder='username'
            />
          )}
          name="username"
        />

        <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.signUpText} >Sign up</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    top: '15%',
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
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  signUpText: {
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
  }
});
