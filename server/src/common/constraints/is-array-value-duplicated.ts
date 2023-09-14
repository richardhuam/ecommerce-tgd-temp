import { User, UserModel } from '@features/users/schema/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsArrayValueDuplicated', async: true })
@Injectable()
export class ArrayValueDuplicateConstraint implements ValidatorConstraintInterface {
	constructor(@InjectModel(User.name) private readonly userModel: UserModel) {}

	async validate(email: string): Promise<boolean> {
		const foundUser = await this.userModel.findOne({ email: email });

		if (foundUser === null) {
			return true;
		}

		return false;
	}

	defaultMessage(args: ValidationArguments) {
		return `The email ${args.value} is already taken`;
	}
}

export function IsArrayValueDuplicated(validationOptions?: ValidationOptions) {
	return function (object: any, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: ArrayValueDuplicateConstraint,
		});
	};
}
