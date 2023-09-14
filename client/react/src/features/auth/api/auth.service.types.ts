import { IApiResponse } from '@/interfaces/api.interface';

// Params
export type ILoginApiParams = {
  email: string;
  password: string;
};

// Responses
export type ILoginApiResponse = IApiResponse<{ token: string; message: string }>;
export type IVerifyTokenApiResponse = IApiResponse<{ message: string }>;

export type ILogoutApiResponse = IApiResponse<string>;
