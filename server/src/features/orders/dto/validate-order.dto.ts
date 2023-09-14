import { ORDER_PAYMENT_METHOD } from '@common/constants';
import { Type } from 'class-transformer';
import {
	ArrayMinSize,
	IsArray,
	IsEnum,
	IsInt,
	IsMongoId,
	IsNotEmpty,
	IsOptional,
	IsString,
	Length,
	Min,
	ValidateNested,
} from 'class-validator';

class ProductPayloadDto {
	@IsNotEmpty()
	@IsMongoId()
	productId: string;

	@IsNotEmpty()
	@IsInt()
	@Min(1)
	quantity: number;
}

export class ValidateOrderDto {
	@ValidateNested({ each: true })
	@IsArray()
	@ArrayMinSize(1)
	@Type(() => ProductPayloadDto)
	products: ProductPayloadDto[];

	@IsOptional()
	@IsString()
	@Length(2, 20)
	couponCode?: string;

	@IsNotEmpty()
	@IsMongoId()
	shippingCostId: string;

	@IsNotEmpty()
	@IsEnum(ORDER_PAYMENT_METHOD)
	paymentMethod: ORDER_PAYMENT_METHOD;
}
