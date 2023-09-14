import { DISCOUNT_TYPE } from '@common/constants';
import { IsEnum, IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCouponDto {
	@IsString()
	@IsNotEmpty()
	@Length(4, 20)
	code: string;

	@IsEnum(DISCOUNT_TYPE)
	@IsNotEmpty()
	discountType: DISCOUNT_TYPE;

	@IsInt()
	@IsNotEmpty()
	discountValue: number;

	@IsInt()
	@IsNotEmpty()
	maxUses: number;

	@IsInt()
	@IsNotEmpty()
	minOrderAmount: number;
}
