import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-app-36926.firebaseio.com/',
});

instance.interceptors.response.use(res => {
  console.log('interceptor');
  console.log(res);
  return res;
});

export default instance;
