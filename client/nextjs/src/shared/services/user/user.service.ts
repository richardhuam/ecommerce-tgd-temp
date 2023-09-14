import { AxiosRequestConfig } from 'axios';

import { apiClient } from '../api/api.service';
import {
  IAssignRoleToUserApiResponse,
  IGetAllUsersApiResponse,
  IGetMeApiResponse,
  IUpdateUserByIdApiParams,
  IUpdateUserByIdApiResponse,
} from './user.service.types';

const suffixUrl = '/users';
export const userApiUrl = (endpoint?: string) => (endpoint ? `${suffixUrl}${endpoint}` : suffixUrl);

export class UserService {
  public static async getAllUsers(): Promise<IGetAllUsersApiResponse> {
    const response = await apiClient.get(userApiUrl());
    return response.data;
  }

  public static async updateUserById(user: IUpdateUserByIdApiParams): Promise<IUpdateUserByIdApiResponse> {
    const response = await apiClient.put(userApiUrl(`/${user._id}`), user);
    return response.data;
  }

  public static async assignRoleToUser(role: string): Promise<IAssignRoleToUserApiResponse> {
    const response = await apiClient.patch(userApiUrl(`/role/${role}`));
    return response.data;
  }

  public static async getMe(axiosConfig?: AxiosRequestConfig): Promise<IGetMeApiResponse> {
    const response = await apiClient.get(userApiUrl('/me'), axiosConfig);
    return response.data;
  }
}
