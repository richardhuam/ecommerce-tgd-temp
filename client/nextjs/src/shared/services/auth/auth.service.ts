import { AxiosRequestConfig } from 'axios';

import { apiClient } from '../api/api.service';
import {
  IGetSessionApiResponse,
  ILoginApiParams,
  ILoginApiResponse,
  ILogoutApiResponse,
  ISignUpApiParams,
  ISignupApiResponse,
} from './auth.service.types';

const suffixUrl = '/auth';
export const authApiUrl = (endpoint?: string) => (endpoint ? `${suffixUrl}${endpoint}` : suffixUrl);

export class AuthService {
  public static async login(data: ILoginApiParams): Promise<ILoginApiResponse> {
    const response = await apiClient.post(authApiUrl('/login'), data);
    return response.data;
  }

  public static async signup(data: ISignUpApiParams): Promise<ISignupApiResponse> {
    const response = await apiClient.post(authApiUrl('/signup'), data);
    return response.data;
  }

  public static async logout(): Promise<ILogoutApiResponse> {
    const response = await apiClient.post(authApiUrl('/logout'));
    return response.data;
  }
  public static async getSession(config?: AxiosRequestConfig): Promise<IGetSessionApiResponse> {
    const response = await apiClient.get(authApiUrl('/session'), config);
    return response.data;
  }
}
