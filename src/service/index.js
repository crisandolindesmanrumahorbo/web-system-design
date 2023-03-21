import constant from '@/constant';
import axios from 'axios';

const {BASE_URL} = constant;

const login = async (username, password) => {
  const url = `${BASE_URL}/authentication/login`;
  const body = {
    username: username,
    password: password,
  }
  const {data: {access_token}} = await axios.post(url, body);
  localStorage.setItem('token', access_token);
  return access_token;
}

const getTodos = async () => {
  const url = `${BASE_URL}/todo`;
  const {data} = await axios.get(url);
  return data;
}

export default {
  login,
  getTodos
};