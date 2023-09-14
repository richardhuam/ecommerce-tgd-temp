import { IUser } from '@/shared/models/account.model';
import { IApiResponse } from '@/shared/models/api.model';
import { ILoggedIn } from '@/shared/models/auth.model';

// Params
export type ILoginApiParams = {
  email: string;
  password: string;
};

export interface ISignUpApiParams extends ILoginApiParams {
  firstName: string;
  lastName: string;
  confirmPassword: string;
}

// Responses
export type ILoginApiResponse = IApiResponse<ILoggedIn>;
export type ISignupApiResponse = IApiResponse<IUser>;
export type ILogoutApiResponse = IApiResponse<string>;
export type IGetSessionApiResponse = IApiResponse<ILoggedIn>;
