import axios from 'axios';
import constants from './constants';

const axiosInstance = axios.create({
  baseURL: constants.BACKEND_BASE_URL,
});

axiosInstance.interceptors.request.use(
  async config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
  },
  error => {
    Promise.reject(error)
  }
);

export default axiosInstance;
