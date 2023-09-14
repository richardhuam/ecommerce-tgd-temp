import { IsNotEmpty, IsMongoId } from 'class-validator';

export class ValidateCartDto {
	@IsMongoId()
	@IsNotEmpty()
	categoryId: string;
}
