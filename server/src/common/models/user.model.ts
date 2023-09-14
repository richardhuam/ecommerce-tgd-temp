import { LOGIN_METHOD, ROLES, USER_STATUS, USER_TYPE } from '@common/constants';
import mongoose from 'mongoose';
import { UserAddressModel } from './user-address.model';

export interface IUser {
	_id: string | mongoose.Schema.Types.ObjectId;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	phone: string;
	avatar: string;
	address: UserAddressModel;
	loginMethod: LOGIN_METHOD;
	type: USER_TYPE;
	wishlist: string[];
	role: ROLES;
	dateOfBirth: string;
	status: USER_STATUS;
}

export type ILoggedIn = {
	_id: string;
	email: string;
	firstName: string;
	lastName: string;
	status: USER_STATUS | '';
	role: ROLES | '';
};

export const EmptyLoggedInState: ILoggedIn = {
	_id: '',
	email: '',
	firstName: '',
	lastName: '',
	role: '',
	status: '',
};

export interface ITokenPayload extends Pick<IUser, 'role'> {
	id: string;
}
