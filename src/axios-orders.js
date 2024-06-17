import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
});

instance.interceptors.response.use(res => {
  return res;
});

export default instance;
