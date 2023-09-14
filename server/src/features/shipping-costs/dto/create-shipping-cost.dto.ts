import { SHIPPING_METHOD } from '@common/constants';
import { IsString, IsNotEmpty, Length, IsEnum, IsNumber } from 'class-validator';
export class CreateShippingCostDto {
	@IsEnum(SHIPPING_METHOD)
	@IsNotEmpty()
	shippingMethod: SHIPPING_METHOD;

	@IsNumber()
	@IsNotEmpty()
	baseCost: number;

	@IsNotEmpty()
	@IsString()
	@Length(10, 500)
	description: string;
}
