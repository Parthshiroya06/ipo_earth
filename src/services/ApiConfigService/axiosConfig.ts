// import {store} from '@store';
import axios, { AxiosError } from 'axios';
import {BASE_URL} from './app-setting';
import { Alert } from 'react-native';

export const getAxiosInstance = () => {
  //  console.log('sdfsdfsfsd', store?.getState()?.user);
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      //   Authorization: 'Bearer ' + (store?.getState()?.user?.accessToken ?? ''),
    },
  });

  instance.interceptors.response.use(
    response => response,
    (error: AxiosError) => {
      const axiosError = error as AxiosError<any>;
      const status = axiosError.response?.status;
      const message = axiosError.response?.data?.message ?? 'Something went wrong.';

      // 🔔 Show Alert
      if (status === 400) {
        Alert.alert('Bad Request', message);
      } else if (status === 401) {
        Alert.alert('Unauthorized', message);
      } else if (status === 500) {
        Alert.alert('Server Error', 'Try again later.');
      } 
     

      // 🔁 Return a new error object with readable message
      return Promise.reject({
        status: status,
        message: message,
        original: error,
      });
    }
  );
  
  return instance;
};
