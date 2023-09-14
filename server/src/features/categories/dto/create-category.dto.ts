import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateCategoryDto {
	@IsString()
	@IsNotEmpty()
	@Length(3, 100)
	name: string;

	@IsNotEmpty()
	@IsString()
	@Length(10, 250)
	description: string;

	image: string;

	slug: string;

	code: string;
}
