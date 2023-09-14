import { IsNotEmpty, IsMongoId } from 'class-validator';

export class GetProductByCategoryIdDto {
	@IsMongoId()
	@IsNotEmpty()
	categoryId: string;
}
