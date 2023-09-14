import axios from 'axios';
import { localStorageKeys } from '@/config/localStorageKeys.config';
import { envConfig } from '@/config/environment.config';

const apiClient = axios.create({
  baseURL: envConfig().apiBaseUrl,
  withCredentials: true,
  timeout: 7000,
});

apiClient.interceptors.request.use(req => {
  const accessToken = window.localStorage.getItem(localStorageKeys.accessToken);
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  return req;
});

export { apiClient };
