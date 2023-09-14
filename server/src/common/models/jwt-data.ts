import { ROLES } from '@common/constants';
import { Types } from 'mongoose';

export interface JwtDataModel {
	id: Types.ObjectId;
	role: ROLES[];
	iat: number;
	exp: number;
}
