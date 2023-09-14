import { ROLES } from '@common/constants';
import { IUser } from '@common/models';
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const gerRoleMetaFromMedata = this.reflector.get<ROLES[]>('roles', context.getHandler());
		const req = context.getArgByIndex(0);
		const currentUser = req.user as IUser;

		// If the user is a customer throw error
		/* 		if (currentUser.type === USER_TYPE.CUSTOMER) {
			throw new UnauthorizedException('You do not have enough access privileges for this operation');
		}
 */
		if (!gerRoleMetaFromMedata) return true;
		// throw new HttpException('NO_ROLES_PROVIDED', HttpStatus.BAD_REQUEST);

		const roles = currentUser.role;

		/* const allowed = roles.some((role) => gerRoleMetaFromMedata?.includes(role)); */
		const allowed = gerRoleMetaFromMedata.includes(roles);

		if (!allowed) throw new HttpException('USER_NOT_AUTHORIZED', HttpStatus.UNAUTHORIZED);

		return allowed;
	}
}
