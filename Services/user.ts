import axios from 'axios';
import TokenService from './token';
import { url } from './url';
import AsyncStorage from '@react-native-async-storage/async-storage';

const login = async (email: string, password: string) => {
  const res = await axios.post(`${url}/user/login`, {
    email,
    password,
  });
  return res;
};

const signUp = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  mobileNumber: number,
  username: string,
) => {
  const res = await axios.post(`${url}/user`, {
    firstName,
    lastName,
    email,
    password,
    mobileNumber,
    username,
  });
  return res;
};

const getLinkToken = async (token: string | null) => {

  const res = await axios.get(`${url}/user/getLinkToken`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res;
};

const exchangePublicTokenForAccesstoken = async (token: string | null, publicToken: string) => {
  const refreshToken = await AsyncStorage.getItem('refresh_token');
  const checkIfTokenValid = await TokenService.refreshToken(token, refreshToken);
  if (checkIfTokenValid.data?.access_token) {
    token = checkIfTokenValid.data?.access_token;
  }

  const res = await axios.post(`${url}/user/exchangePublicToken`, {
    public_token: publicToken,
  }, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res;
};

const getAllTransactions = async (token: string | null, time: string) => {
  const refreshToken = await AsyncStorage.getItem('refresh_token');

  const checkIfTokenValid = await TokenService.refreshToken(token, refreshToken);
  if (checkIfTokenValid.data?.access_token) {
    token = checkIfTokenValid.data?.access_token;
  }

  const res = await axios.get(`${url}/user/getTransactions/${time}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res;
};

const UserService = {
  login,
  signUp,
  getLinkToken,
  exchangePublicTokenForAccesstoken,
  getAllTransactions
};



export default UserService;
