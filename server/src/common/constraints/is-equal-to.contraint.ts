import { ClassConstructor } from 'class-transformer';
import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsEqualTo' })
export class IsEqualToConstraint implements ValidatorConstraintInterface {
	validate(value: any, args: ValidationArguments) {
		const [fn] = args.constraints;
		return fn(args.object) === value;
	}

	defaultMessage() {
		return 'Passwords does not match';
	}
}

export const IsEqualTo = <T>(type: ClassConstructor<T>, property: (o: T) => any, validationOptions?: ValidationOptions) => {
	return (object: any, propertyName: string) => {
		registerDecorator({
			target: object.constructor,
			propertyName,
			options: validationOptions,
			constraints: [property],
			validator: IsEqualToConstraint,
		});
	};
};
