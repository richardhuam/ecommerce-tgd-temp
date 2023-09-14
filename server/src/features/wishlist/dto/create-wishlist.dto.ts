import { IsMongoId } from 'class-validator';

export class CreateWishlistDto {
	@IsMongoId()
	owner: string;
}
