import { ROLES } from '@common/constants';

export const rolesWithAdmin = (roles: ROLES[]) => {
	return [...roles, ROLES.ADMIN];
};
