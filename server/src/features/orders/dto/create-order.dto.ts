import { COUPON_STATUS, DISCOUNT_METHODS, ORDER_PAYMENT_METHOD, SHIPPING_METHOD } from '@common/constants';
import { Type } from 'class-transformer';
import {
	ArrayMinSize,
	IsArray,
	IsBoolean,
	IsEnum,
	IsInt,
	IsMongoId,
	IsNotEmpty,
	IsObject,
	IsOptional,
	IsString,
	Length,
	Min,
	ValidateNested,
} from 'class-validator';

class OrderItemsDto {
	@IsNotEmpty()
	@IsMongoId()
	productId: string;

	@IsNotEmpty()
	@IsInt()
	@Min(1)
	quantity: number;
}

export class OrderShippingDto {
	@IsNotEmpty()
	@IsEnum(SHIPPING_METHOD)
	method: SHIPPING_METHOD;

	@IsString()
	@IsNotEmpty()
	baseCost: string;

	@IsString()
	@IsNotEmpty()
	totalAmount: string;

	@IsBoolean()
	@IsNotEmpty()
	isFree: boolean;

	@IsString()
	@IsNotEmpty()
	minOrderAmountForFreeShipping: string;
}

export class OrderTaxesDto {
	@IsString()
	@IsNotEmpty()
	totalAmount: string;

	@IsString()
	@IsNotEmpty()
	percent: string;
}

export class OrderDiscountDto {
	@IsNotEmpty()
	@IsEnum(DISCOUNT_METHODS)
	method: DISCOUNT_METHODS;

	@IsNotEmpty()
	@IsEnum(COUPON_STATUS)
	status: COUPON_STATUS;

	@IsString()
	@IsNotEmpty()
	code: string;

	@IsString()
	@IsNotEmpty()
	percent: string;

	@IsString()
	@IsNotEmpty()
	totalAmount: boolean;

	@IsString()
	@IsNotEmpty()
	minOrderAmount: string;
}

export class CreateOrderDto {
	@IsNotEmpty()
	@IsString()
	orderId: string;

	@IsNotEmpty()
	@IsString()
	trackingNumber: string;

	@IsNotEmpty()
	@IsMongoId()
	customerId: string;

	@ValidateNested({ each: true })
	@IsArray()
	@ArrayMinSize(1)
	@Type(() => OrderItemsDto)
	items: OrderItemsDto[];

	@IsNotEmpty()
	@IsInt()
	totalItems: number;

	@IsOptional()
	@IsString()
	@Length(10, 800)
	orderNotes: string;

	@IsNotEmpty()
	@IsEnum(ORDER_PAYMENT_METHOD)
	paymentMethod: ORDER_PAYMENT_METHOD;

	@IsObject()
	@Type(() => OrderShippingDto)
	shipping: OrderShippingDto;

	@IsObject()
	@Type(() => OrderTaxesDto)
	taxes: OrderTaxesDto;

	@IsObject()
	@Type(() => OrderDiscountDto)
	discount: OrderDiscountDto;

	@IsOptional()
	@IsString()
	@Length(4, 20)
	couponCode?: string;

	@IsNotEmpty()
	@IsString()
	subTotalPrice: string;

	@IsNotEmpty()
	@IsString()
	totalPrice: string;

	@IsNotEmpty()
	@IsString()
	stripeSessionId: string;
}
