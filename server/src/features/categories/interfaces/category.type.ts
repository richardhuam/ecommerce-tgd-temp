import { CreateCategoryDto } from '../dto/create-category.dto';

export interface ICreateCategory {
	path: string;
	file: Express.Multer.File;
	createCategoryDto: CreateCategoryDto;
}
