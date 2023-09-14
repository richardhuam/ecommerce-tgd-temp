import { ROLES } from '@common/constants';
import { IUser } from '@common/models';

export function isAdmin(object: unknown): object is IUser {
	if (object !== null && typeof object === 'object') {
		const user = object as IUser;

		return user.role.includes(ROLES.ADMIN);
	}
	return false;
}
