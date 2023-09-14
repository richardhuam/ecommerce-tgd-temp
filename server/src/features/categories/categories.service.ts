import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryModel } from './schema/category.schema';
import { OkResponse } from '@common/utils';
import { ICreateCategory } from './interfaces/category.type';
import slugify from 'slugify';
import { formatImageName } from '@common/utils/format-image-name';
import { createProductCategoryCode } from '@common/utils/create-product-category-code';
import { Product, ProductModel } from '@features/products/schema/product.schema';
import { S3Service } from '@common/libs/aws-s3.lib';
import { IProductPopulated } from '@common/models';
import { Review, ReviewModel } from '@features/reviews/schema/review.schema';
import { applyProductDiscount } from '@common/utils/products/apply-product-discount';

@Injectable()
export class CategoriesService {
	private readonly s3Service: S3Service;
	constructor(
		@InjectModel(Category.name) private readonly categoryModel: CategoryModel,
		@InjectModel(Product.name) private readonly productModel: ProductModel,
		@InjectModel(Review.name) private readonly reviewModel: ReviewModel,
	) {
		this.s3Service = new S3Service();
	}

	async getAllCategories() {
		const result = await this.categoryModel.find();
		return OkResponse(result);
	}

	async getCategoryById(categoryId: string) {
		const category = await this.categoryModel.findById(categoryId).lean();

		return OkResponse(category);
	}

	async getProductsByCategoryId(categoryId: string) {
		const products = (await this.productModel
			.find({ category: categoryId })
			.populate<IProductPopulated>({
				path: 'category',
				model: this.categoryModel,
				options: { strictPopulate: false },
			})
			.populate<IProductPopulated>({
				path: 'reviews',
				model: this.reviewModel,
				options: { strictPopulate: false },
			})
			.lean()
			.exec()) as IProductPopulated[];

		const productsWithDiscount = products.map((item) => applyProductDiscount(item));

		return OkResponse(productsWithDiscount);
	}

	async createCategory({ file, path, createCategoryDto }: ICreateCategory) {
		if (!file) throw new HttpException('PRODUCT_CATEGORY_IMAGE_REQUIRED', HttpStatus.BAD_REQUEST);

		createCategoryDto.slug = slugify(createCategoryDto.name, { lower: true });
		const existingCategory = await this.categoryModel.findOne({ slug: createCategoryDto.slug });

		if (existingCategory) {
			throw new HttpException('PRODUCT_CATEGORY_DUPLICATE_SLUG', HttpStatus.BAD_REQUEST);
		} else {
			const formattedImageName = formatImageName(file.originalname, 'product-category');
			await this.s3Service.uploadImageToS3(file, path, formattedImageName);
			createCategoryDto.code = createProductCategoryCode(createCategoryDto.name);
			createCategoryDto.image = formattedImageName;
		}

		const result = await this.categoryModel.create(createCategoryDto);

		return OkResponse(result);
	}

	//TODO Update category --> PUT updateCategoryDetails
}
