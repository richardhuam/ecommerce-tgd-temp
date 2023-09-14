import { IUser } from '@/shared/models/account.model';
import { IApiResponse } from '@/shared/models/api.model';

//Params
export type IUpdateUserByIdApiParams = Partial<IUser>;
// Responses
export type IGetAllUsersApiResponse = IApiResponse<IUser[]>;
export type IUpdateUserByIdApiResponse = IApiResponse<IUser>;
export type IAssignRoleToUserApiResponse = IApiResponse<IUser>;
export type IGetMeApiResponse = IApiResponse<IUser>;
