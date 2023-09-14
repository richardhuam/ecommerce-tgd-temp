import { USER_TYPE } from '@common/constants';
import { IsEnum, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserTypeDto {
	@IsNotEmpty()
	@IsString()
	@IsMongoId()
	_id: string;

	@IsNotEmpty()
	@IsEnum(USER_TYPE)
	type: USER_TYPE;
}
