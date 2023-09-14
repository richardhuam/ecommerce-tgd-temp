import { Controller, Get, Body, Patch, Req, UseGuards, Put, Param, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '@common/guards/jwt-auth';
import { UpdateUserRolesDto } from './dto';
import { RolesGuard } from '@common/guards/role-guard';
import { Roles } from '@common/decorators';
import { ROLES } from '@common/constants';
import { ObjectIdValidationPipe } from '@common/pipes/object-id-validation.pipe';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles([ROLES.ADMIN])
	@Get()
	async getAllUsers() {
		return await this.usersService.getAllUsers();
	}

	@UseGuards(JwtAuthGuard)
	@Get('me')
	async getProfile(@Req() req: Request, @Res() res: Response) {
		return await this.usersService.getUserDetails({ req, res });
	}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles([ROLES.ADMIN])
	@Patch('role/:userId')
	async assignRoleToUser(@Param('userId', ObjectIdValidationPipe) userId: string, @Body() dto: UpdateUserRolesDto) {
		return await this.usersService.assignRoleToUser(userId, dto);
	}

	@UseGuards(JwtAuthGuard)
	@Put(':userId')
	async updateUserDetails(@Param('userId', ObjectIdValidationPipe) userId: string, @Body() dto: UpdateUserDto) {
		return await this.usersService.updateUserDetails(userId, dto);
	}
}
