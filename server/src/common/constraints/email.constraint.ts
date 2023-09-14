import { User, UserModel } from '@features/users/schema/user.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'IsEmailUnique', async: true })
@Injectable()
export class UniqueEmailConstraint implements ValidatorConstraintInterface {
	constructor(@InjectModel(User.name) private readonly userModel: UserModel) {}

	async validate(email: string): Promise<boolean> {
		const foundUser = await this.userModel.exists({ email });
		if (foundUser) throw new HttpException('EMAIL_ALREADY_TAKEN', HttpStatus.BAD_GATEWAY);

		return true;
	}

	/* 	defaultMessage(args: ValidationArguments) {
		return 'email is already taken';
	} */
}

export function IsEmailUnique(validationOptions?: ValidationOptions) {
	return function (object: any, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: UniqueEmailConstraint,
		});
	};
}
