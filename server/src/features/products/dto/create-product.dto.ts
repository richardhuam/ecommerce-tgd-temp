import { DISCOUNT_TYPE } from '@common/constants';
import { Type } from 'class-transformer';
import {
	IsString,
	IsNotEmpty,
	Length,
	IsNotEmptyObject,
	IsObject,
	ValidateNested,
	IsArray,
	IsOptional,
	IsMongoId,
	Min,
	Max,
	IsEnum,
	IsBoolean,
	IsInt,
} from 'class-validator';

class ProductImages {
	@IsString()
	@IsNotEmpty()
	main: string;

	subs?: string[];
}

class ProductPrice {
	@IsInt()
	@IsNotEmpty()
	/* Min price: 1.00(1) dollar */
	@Min(100)
	/* Max price: 20,000.00(20k) dollars */
	@Max(2000000)
	amount: number;

	@IsString()
	@IsNotEmpty()
	currency: string;
}

class ProductInventary {
	@IsString()
	@IsNotEmpty()
	stock: string;

	@IsString()
	@IsNotEmpty()
	sold: string;
}

class ProductDiscount {
	@IsBoolean()
	@IsNotEmpty()
	isActive: boolean;

	@IsEnum(DISCOUNT_TYPE)
	@IsNotEmpty()
	type: DISCOUNT_TYPE;

	@IsInt()
	@IsNotEmpty()
	@Type(() => Number)
	value: number;
}

class ProductVariants {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsArray()
	options: string[];
}

export class CreateProductDto {
	@IsString()
	@IsNotEmpty()
	@Length(2, 100)
	name: string;

	@IsString()
	@IsNotEmpty()
	@Length(2, 100)
	brand: string;

	@IsMongoId()
	@IsNotEmpty()
	category: string;

	@IsNotEmpty()
	@IsString()
	@Length(10, 800)
	description: string;

	@IsNotEmptyObject()
	@IsObject()
	@ValidateNested()
	@Type(() => ProductPrice)
	price: ProductPrice;

	/* 	@IsString()
	@IsNotEmpty()
	@Length(16, 16) */
	sku: string;

	slug: string;

	@IsNotEmptyObject()
	@IsObject()
	@ValidateNested()
	@Type(() => ProductInventary)
	inventory: ProductInventary;

	images: ProductImages;

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	variants?: ProductVariants[];

	@IsOptional()
	@IsObject()
	@ValidateNested({ each: true })
	specifications?: { [key: string]: string };

	lastSoldDate: Date;

	@IsOptional()
	@IsObject()
	@ValidateNested()
	@Type(() => ProductDiscount)
	discount?: ProductDiscount;
}
