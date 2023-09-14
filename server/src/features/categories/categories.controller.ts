import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	UseInterceptors,
	UploadedFile,
	ParseFilePipe,
	MaxFileSizeValidator,
	UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCategoryDto } from './dto/create-category.dto';
import { envConfig } from '@config/environment';
import { ObjectIdValidationPipe } from '@common/pipes/object-id-validation.pipe';
import { JwtAuthGuard } from '@common/guards/jwt-auth';
import { Roles } from '@common/decorators';
import { ROLES } from '@common/constants';
import { RolesGuard } from '@common/guards/role-guard';
@Controller('categories')
export class CategoriesController {
	constructor(private readonly categoriesService: CategoriesService) {}

	@Get()
	async getAllCategories() {
		return await this.categoriesService.getAllCategories();
	}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles([ROLES.ADMIN])
	@Post()
	@UseInterceptors(FileInterceptor('image'))
	async createCategory(
		@UploadedFile(
			new ParseFilePipe({
				validators: [new MaxFileSizeValidator({ maxSize: 5000000 })],
			}),
		)
		file: Express.Multer.File,
		@Body()
		createCategoryDto: CreateCategoryDto,
	) {
		const path = envConfig().aws.s3.productCategoriesImagesPath;
		return await this.categoriesService.createCategory({ file, path, createCategoryDto });
	}

	@Get(':categoryId')
	async getCategoryById(@Param('categoryId', ObjectIdValidationPipe) categoryId: string) {
		return await this.categoriesService.getCategoryById(categoryId);
	}

	@Get(':categoryId/products')
	async getProductsByCategoryId(@Param('categoryId', ObjectIdValidationPipe) categoryId: string) {
		return await this.categoriesService.getProductsByCategoryId(categoryId);
	}
}
