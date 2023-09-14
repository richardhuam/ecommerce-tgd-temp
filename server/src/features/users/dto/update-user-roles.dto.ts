import { ROLES } from '@common/constants';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateUserRolesDto {
	@IsEnum(ROLES)
	@IsNotEmpty()
	role: ROLES;
}
