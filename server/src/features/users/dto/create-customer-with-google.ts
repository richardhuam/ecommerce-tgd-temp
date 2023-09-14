import { IsString, Length, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { LOGIN_METHOD } from 'src/common/constants';
import { IsEmailUnique } from 'src/common/constraints/email.constraint';

export class CreateCustomerWithGoogle {
	@IsNotEmpty()
	@IsEmail()
	@IsEmailUnique()
	email: string;

	@IsNotEmpty()
	@IsString()
	@Length(3, 25)
	firstName: string;

	@IsString()
	@Length(4, 25)
	@IsOptional()
	lastName: string;

	@IsOptional()
	@IsString()
	avatar: string;

	@IsNotEmpty()
	@IsString()
	loginMethod: LOGIN_METHOD.GOOGLE;
}
