import axios from 'axios';
import Constants from 'expo-constants';

const baseURL = Constants.expoConfig?.extra?.API_BASE_URL;

console.log('API configurada para a URL:', baseURL);

const api = axios.create({
  baseURL: baseURL,
});

export default api;
