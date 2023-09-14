import slugify from 'slugify';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductModel } from './schema/product.schema';
import { OkResponse } from '@common/utils';
import { formatImageName } from '@common/utils/format-image-name';
import { createProductSKU } from '@common/utils/create-product-sku';
import { IProductCategory, IProductPopulated, IUser } from '@common/models';
import { createProductSlug } from '@common/utils/create-product-slug';
import { Category, CategoryModel } from '@features/categories/schema/category.schema';
import { Review, ReviewModel } from '@features/reviews/schema/review.schema';
import {
	IAddToWishlist,
	ICreateProduct,
	IGetBestSellersWithPagination,
	IGetNewArrivalsWithPagination,
	IGetTrendingProductsWithPagination,
	IProductQueries,
} from './interfaces/product.interface';
import { User, UserModel } from '@features/users/schema/user.schema';
import { S3Service } from '@common/libs/aws-s3.lib';
import { applyProductDiscount } from '@common/utils/products/apply-product-discount';

@Injectable()
export class ProductsService {
	private readonly s3Service: S3Service;
	constructor(
		@InjectModel(Product.name) private readonly productModel: ProductModel,
		@InjectModel(Category.name) private readonly categoryModel: CategoryModel,
		@InjectModel(Review.name) private readonly reviewModel: ReviewModel,
		@InjectModel(User.name) private readonly userModel: UserModel,
	) {
		this.s3Service = new S3Service();
	}

	async getBestSellers() {
		const products = (await this.productModel
			.find()
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
			.sort({ 'inventory.sold': -1 })
			.limit(10)
			.lean()
			.exec()) as IProductPopulated[];

		const productsWithDiscount = products.map((item) => applyProductDiscount(item));

		return OkResponse(productsWithDiscount);
	}

	async getBestSellersWithPagination({ page, limit }: IGetBestSellersWithPagination) {
		const queryLimit = parseInt(limit, 10) || 8;
		const queryPage = parseInt(page, 10) || 1;

		const totalProducts = await this.productModel.countDocuments();

		const totalPages = Math.ceil(totalProducts / queryLimit);

		const products = (await this.productModel
			.find()
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
			.sort({ 'inventory.sold': -1 })
			.limit(queryLimit * 1)
			.skip((queryPage - 1) * queryLimit)
			.lean()
			.exec()) as IProductPopulated[];

		const productsWithDiscount = products.map((item) => applyProductDiscount(item));

		return OkResponse({
			pagination: {
				currentPage: queryPage,
				hasNextPage: queryPage !== totalPages,
				totalItems: totalProducts,
				totalPages,
				limit: queryLimit,
			},
			result: productsWithDiscount,
		});
	}

	async getNewArrivals() {
		const products = (await this.productModel
			.find()
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
			.sort({ createdAt: 'desc' })
			.limit(10)
			.lean()
			.exec()) as IProductPopulated[];

		const productsWithDiscount = products.map((item) => applyProductDiscount(item));
		return OkResponse(productsWithDiscount);
	}

	async getNewArrivalsWithPagination({ page, limit }: IGetNewArrivalsWithPagination) {
		const queryLimit = parseInt(limit, 10) || 8;
		const queryPage = parseInt(page, 10) || 1;

		const totalProducts = await this.productModel.countDocuments();

		const totalPages = Math.ceil(totalProducts / queryLimit);

		const products = (await this.productModel
			.find()
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
			.sort({ createdAt: 'desc' })
			.limit(queryLimit * 1)
			.skip((queryPage - 1) * queryLimit)
			.lean()
			.exec()) as IProductPopulated[];

		const productsWithDiscount = products.map((item) => applyProductDiscount(item));

		return OkResponse({
			pagination: {
				currentPage: queryPage,
				hasNextPage: queryPage !== totalPages,
				totalItems: totalProducts,
				totalPages,
				limit: queryLimit,
			},
			result: productsWithDiscount,
		});
	}

	async getTrendingProducts() {
		const products = (await this.productModel
			.find()
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
			.sort({ score: -1 })
			.limit(10)
			.lean()
			.exec()) as IProductPopulated[];

		const productsWithDiscount = products.map((item) => applyProductDiscount(item));

		return OkResponse(productsWithDiscount);
	}

	async getTrendingProductsWithPagination({ page, limit }: IGetTrendingProductsWithPagination) {
		const queryLimit = parseInt(limit, 10) || 8;
		const queryPage = parseInt(page, 10) || 1;

		const totalProducts = await this.productModel.countDocuments();

		const totalPages = Math.ceil(totalProducts / queryLimit);
		const products = (await this.productModel
			.find()
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
			.sort({ score: -1 })
			.limit(queryLimit * 1)
			.skip((queryPage - 1) * queryLimit)
			.lean()
			.exec()) as IProductPopulated[];

		const productsWithDiscount = products.map((item) => applyProductDiscount(item));

		return OkResponse({
			pagination: {
				currentPage: queryPage,
				hasNextPage: queryPage !== totalPages,
				totalItems: totalProducts,
				totalPages,
				limit: queryLimit,
			},
			result: productsWithDiscount,
		});
	}

	async viewProduct(productId: string) {
		const product = await this.productModel.findByIdAndUpdate(productId, { $inc: { views: 1, score: 1 } }, { new: true });

		if (!product) throw new HttpException('PRODUCT_NOT_FOUND', HttpStatus.NOT_FOUND);

		return OkResponse({
			productId: product._id,
			productName: product.name,
			views: product.views,
			score: product.score,
		});
	}

	async searchProducts({ keyWord, page: _page, limit: _limit }: IProductQueries) {
		const limit = parseInt(_limit, 10) || 8;
		const page = parseInt(_page, 10) || 1;

		const keywords = keyWord.split(' ').map((key) => new RegExp(key, 'i'));

		let where = {};

		if (keyWord) {
			where = {
				$or: [{ name: { $in: keywords } }, { brand: { $in: keywords } }, { sku: { $in: keywords } }],
			};
		}

		const totalProducts = await this.productModel.countDocuments(where);

		const totalPages = Math.ceil(totalProducts / limit);

		const products = (await this.productModel
			.find(where)
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
			.limit(limit * 1)
			.skip((page - 1) * limit)
			.lean()
			.exec()) as IProductPopulated[];

		const productsWithDiscount = products.map((item) => applyProductDiscount(item));

		return OkResponse({
			pagination: {
				query: keyWord,
				currentPage: page,
				hasNextPage: page !== totalPages,
				totalItems: totalProducts,
				totalPages,
				limit,
			},
			result: productsWithDiscount,
		});
	}

	async getProductById(productId: string) {
		const product = await this.productModel
			.findById(productId)
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
			.exec();

		if (!product) throw new HttpException('PRODUCT_NOT_FOUND', HttpStatus.NOT_FOUND);

		const productsWithDiscount = applyProductDiscount(product);

		return OkResponse(productsWithDiscount);
	}

	async getProductBySku(productSku: string) {
		const product = await this.productModel
			.findOne({ sku: productSku })
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
			.exec();

		if (!product) throw new HttpException('PRODUCT_NOT_FOUND', HttpStatus.NOT_FOUND);

		const productsWithDiscount = applyProductDiscount(product);

		return OkResponse(productsWithDiscount);
	}

	async toggleWishlistItem({ productId, req, res }: IAddToWishlist) {
		const user = req.user as IUser;

		const product = await this.productModel.findById(productId).lean();

		if (!product) throw new HttpException('PRODUCT_NOT_FOUND', HttpStatus.NOT_FOUND);

		const productAlreadyAdded = user.wishlist.find((id) => id.toString() === productId);

		if (productAlreadyAdded) {
			await this.userModel.findByIdAndUpdate(
				user._id,
				{ $pull: { wishlist: productId } },
				{
					new: true,
				},
			);

			return res.status(HttpStatus.OK).json(
				OkResponse({
					status: 'removed',
					productId,
				}),
			);
		} else {
			await this.userModel.findByIdAndUpdate(
				user._id,
				{
					$push: { wishlist: productId },
				},
				{
					new: true,
				},
			);

			return res.status(HttpStatus.OK).json(
				OkResponse({
					status: 'added',
					productId,
				}),
			);
		}
	}

	async getRecommendedProducts(productId: string) {
		const product = await this.productModel
			.findById(productId)
			.populate<IProductPopulated>({
				path: 'category',
				model: this.categoryModel,
				options: { strictPopulate: false },
			})
			.lean()
			.exec();

		if (!product) throw new HttpException('PRODUCT_NOT_FOUND', HttpStatus.NOT_FOUND);

		const recommendations = (await this.productModel
			.find({ brand: new RegExp(product.brand, 'i'), _id: { $ne: productId } })
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

		const recommendationsWithDiscount = recommendations.map((item) => applyProductDiscount(item));

		return OkResponse(recommendationsWithDiscount);
	}

	async validateCart(cartPayloadDto: Array<{ productId: string; quantity: number }>) {
		const products = await Promise.all(
			cartPayloadDto.map(async (item) => {
				const foundProduct = (await this.productModel
					.findById(item.productId)
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
					//.select({})
					.lean()
					.exec()) as IProductPopulated;
				const productWithDiscount = applyProductDiscount(foundProduct);

				return { product: productWithDiscount, quantity: item.quantity };
			}),
		);

		const totalPrice = products.reduce((total, cartItem) => {
			return total + (Number(cartItem.product.price.amount) || 0) * cartItem.quantity;
		}, 0);

		return OkResponse({ products, totalPrice });
	}

	async createProduct({ files = [], path, createProductDto }: ICreateProduct) {
		if (files.length > 5) throw new HttpException('PRODUCT_IMAGES_LIMIT_EXCEEDED', HttpStatus.BAD_REQUEST);

		createProductDto.slug = slugify(createProductSlug(createProductDto), { lower: true });

		//Check if product slug already exists
		const productSlug: IProductCategory | null = await this.productModel.findOne({ slug: createProductDto.slug }).lean();

		if (productSlug) throw new HttpException('PRODUCT_DUPLICATE_SLUG', HttpStatus.BAD_REQUEST);

		//Check if product category does not exist
		const productCategory: IProductCategory | null = await this.categoryModel.findById(createProductDto.category);

		if (productCategory) throw new HttpException('PRODUCT_CATEGORY_NOT_FOUND', HttpStatus.NOT_FOUND);

		createProductDto.sku = createProductSKU({ createProductDto, productCategory });

		//Upload product image to S3
		const uploadProductImages = files.map(async (file) => {
			const formatedImageName = formatImageName(file.originalname, 'product');

			await this.s3Service.uploadImageToS3(file, path, formatedImageName);
			return formatedImageName;
		});

		const productImages = await Promise.all(uploadProductImages);

		const [mainProduct, ...subProductImages] = productImages;

		const images = {
			main: mainProduct,
			subs: subProductImages,
		};

		const dataResult = { images, ...createProductDto };

		const result = await this.productModel.create(dataResult);

		return OkResponse(result);
	}
}
