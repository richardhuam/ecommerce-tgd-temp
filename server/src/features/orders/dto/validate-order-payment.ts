import { IsNotEmpty, IsString } from 'class-validator';

export class ValidateOrderPaymentDto {
	@IsNotEmpty()
	@IsString()
	orderId: string;
}
