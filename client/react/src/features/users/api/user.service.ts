import { apiClient } from '@/config/axios.config';
import { IGetMeApiResponse } from './user.service.types';

const suffixUrl = '/users';
export const userApiUrl = (endpoint?: string) => (endpoint ? `${suffixUrl}${endpoint}` : suffixUrl);

export class UserService {
  public static async getMe(): Promise<IGetMeApiResponse> {
    const response = await apiClient.get(userApiUrl('/me'));
    return response.data;
  }
}
