import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject, IsOptional, IsString, Length, MinLength } from 'class-validator';

export class UserPhoneClass {
	@IsNotEmpty()
	@IsString()
	@MinLength(1)
	code: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(6)
	number: string;
}

export class UserCountryAddressClass {
	@IsNotEmpty()
	@IsString()
	@MinLength(1)
	code: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(3)
	name: string;
}

export class UserAddressClass {
	@IsOptional()
	@IsString()
	@Length(6, 80)
	street?: string;

	@IsString()
	@IsNotEmpty()
	@Length(3, 30)
	city: string;

	@IsString()
	@IsNotEmpty()
	@Length(2, 30)
	state: string;

	@IsOptional()
	@IsObject()
	@Type(() => UserCountryAddressClass)
	country: UserCountryAddressClass;

	@IsString()
	@IsNotEmpty()
	@Length(3, 30)
	zip: string;
}
