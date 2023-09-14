import axios from 'axios';

import { envService } from '../env/env.service';

export const apiClient = axios.create({
  baseURL: envService().apiBaseUrl,
  withCredentials: true,
  /*   headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }, */
});

export const apiBaseUrl = envService().apiBaseUrl;
