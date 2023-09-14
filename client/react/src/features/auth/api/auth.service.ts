import { apiClient } from '@/config/axios.config';
import { ILoginApiParams, ILoginApiResponse, IVerifyTokenApiResponse } from './auth.service.types';

const suffixUrl = '/auth';
export const authApiUrl = (endpoint?: string) => (endpoint ? `${suffixUrl}${endpoint}` : suffixUrl);

export class AuthService {
  public static async login(data: ILoginApiParams): Promise<ILoginApiResponse> {
    const response = await apiClient.post(authApiUrl('/login'), data);
    return response.data;
  }

  public static async verifyToken(): Promise<IVerifyTokenApiResponse> {
    const response = await apiClient.post(authApiUrl('/verify-token'));
    return response.data;
  }
}
