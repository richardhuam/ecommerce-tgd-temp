import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsObject, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { UserAddressClass } from '@common/models';
import { CreateUserDto } from '@features/auth/dto';

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['confirmPassword', 'password', 'email'] as const)) {
	@IsOptional()
	@IsString()
	phone: string;

	@IsOptional()
	@IsObject()
	@Type(() => UserAddressClass)
	address: UserAddressClass;

	@IsOptional()
	@IsString()
	dateOfBirth: string;
}
