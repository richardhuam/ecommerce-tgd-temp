import { IsString, IsNotEmpty, IsNumber, IsOptional, Min, Max, MinLength, MaxLength } from 'class-validator';

export class CreateReviewDto {
	@IsNotEmpty()
	@IsString()
	productSku: string;

	@IsNotEmpty()
	@IsString()
	orderId: string;

	@IsNotEmpty()
	@IsNumber()
	@IsNotEmpty()
	@Min(1)
	@Max(5)
	rating: number;

	@IsOptional()
	@IsString()
	@MinLength(1)
	@MaxLength(800)
	comment: string;
}
