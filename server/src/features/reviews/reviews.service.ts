import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Review, ReviewModel } from './schema/review.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { OkResponse, applyProductDiscount } from '@common/utils';
import { Request, Response } from 'express';
import { IProductPopulated, IUser } from '@common/models';
import { Product, ProductModel } from '@features/products/schema/product.schema';
import { User, UserModel } from '@features/users/schema/user.schema';
import { IReviewPopulated } from '@common/models/review.model';
import { Order, OrderModel } from '@features/orders/schema/order.schema';
import { PAYMENT_STATUS } from '@common/constants';
import { Category, CategoryModel } from '@features/categories/schema/category.schema';

@Injectable()
export class ReviewsService {
	constructor(
		@InjectModel(Review.name) private readonly reviewModel: ReviewModel,
		@InjectModel(Product.name) private readonly productModel: ProductModel,
		@InjectModel(Category.name) private readonly categoryModel: CategoryModel,
		@InjectModel(User.name) private readonly userModel: UserModel,
		@InjectModel(Order.name) private readonly orderModel: OrderModel,
	) {}

	async createReview(createReviewDto: CreateReviewDto, req: Request, res: Response) {
		const user = req.user as IUser;

		const product = await this.productModel.findOne({ sku: createReviewDto.productSku }).lean();

		if (!product) {
			throw new HttpException('PRODUCT_NOT_FOUND', HttpStatus.NOT_FOUND);
		}

		const reviewToUpdate = await this.orderModel.findOne({ orderId: createReviewDto.orderId }).lean();

		if (!reviewToUpdate) {
			throw new HttpException('ORDER_NOT_FOUND', HttpStatus.NOT_FOUND);
		}

		const updatedItems = reviewToUpdate.items.map((item) => {
			if (item.productSku === createReviewDto.productSku && !item.reviewed) {
				item.reviewed = true;
			}
			return item;
		});

		const updatedOrder = await this.orderModel.updateOne({ orderId: createReviewDto.orderId }, { items: updatedItems });

		if (!updatedOrder) {
			throw new HttpException('ERROR_WHILE_CREATING_REVIEW', HttpStatus.BAD_REQUEST);
		}

		const productPayloadToCreate = { ...createReviewDto, author: user._id, product: createReviewDto.productSku };

		const review = await this.reviewModel.create(productPayloadToCreate);
		await this.productModel.updateOne({ _id: product._id }, { $push: { reviews: review._id } });
		return res.status(HttpStatus.CREATED).json(OkResponse(review));
	}

	async getReviewsFromProductSku({ productSku, page, limit }: { productSku: string; page: string; limit: string }) {
		const queryLimit = parseInt(limit, 10) || 8;
		const queryPage = parseInt(page, 10) || 1;

		const totalReviews = await this.reviewModel.countDocuments();
		const totalPages = Math.ceil(totalReviews / queryLimit);

		const reviews = (await this.reviewModel
			.find({ product: productSku })
			.populate<IReviewPopulated>({
				path: 'author',
				model: this.userModel,
				options: { strictPopulate: false },
			})
			.sort({ createdAt: 'desc' })
			.limit(queryLimit * 1)
			.skip((queryPage - 1) * queryLimit)
			.lean()
			.exec()) as IReviewPopulated[];

		const reviewsResult = await Promise.all(
			reviews.map(async (item) => {
				const populatedProduct = await this.productModel.findOne({ sku: item.product });
				return { ...item, product: populatedProduct };
			}),
		);

		return OkResponse({
			pagination: {
				currentPage: queryPage,
				hasNextPage: queryPage !== totalPages,
				totalItems: totalReviews,
				totalPages,
				limit: queryLimit,
			},
			result: reviewsResult,
		});
	}

	async getPendingReviews(req: Request, res: Response, page: string, limit: string) {
		const user = req.user as IUser;

		let where = {
			customer: user._id,
			paymentStatus: PAYMENT_STATUS.PAID,
		};

		const queryLimit = parseInt(limit, 10) || 8;
		const queryPage = parseInt(page, 10) || 1;

		const totalOrders = await this.orderModel.countDocuments(where);
		const totalPages = Math.ceil(totalOrders / queryLimit);

		const ordersPending = await this.orderModel
			.find(where)
			.sort({ createdAt: -1 })
			.limit(queryLimit * 1)
			.skip((queryPage - 1) * queryLimit)
			.lean()
			.exec();

		const pendingReviews = await Promise.all(
			ordersPending.flatMap((order) => {
				const orderId = order.orderId;
				const orderDate = order['createdAt'];
				const orderTrackingNumber = order.trackingNumber;
				return order.items
					.filter((item) => !item.reviewed)
					.map(async (el) => {
						const product = (await this.productModel
							.findById(el.product)
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
							.exec()) as IProductPopulated;

						if (!product) throw new HttpException('PRODUCT_NOT_FOUND', HttpStatus.NOT_FOUND);

						const productsWithDiscount = applyProductDiscount(product);

						const result = { ...el, orderId, orderDate, orderTrackingNumber, product: productsWithDiscount };

						return result;
					});
			}),
		);

		const groupedPendingReviews: (typeof pendingReviews)[] = pendingReviews.reduce((acc: (typeof pendingReviews)[], current) => {
			const existingOrder = acc.find((item) => item[0].orderId === current.orderId);
			if (existingOrder) {
				existingOrder.push(current);
			} else {
				acc.push([current]);
			}
			return acc;
		}, []);

		return res.status(HttpStatus.OK).json(
			OkResponse({
				pagination: {
					currentPage: queryPage,
					hasNextPage: queryPage !== totalPages,
					totalItems: totalOrders,
					totalPages: totalPages,
					limit: queryLimit,
				},
				result: groupedPendingReviews,
			}),
		);
	}

	async getCompletedReviews(req: Request, res: Response, page: string, limit: string) {
		const user = req.user as IUser;

		let where = {
			customer: user._id,
			paymentStatus: PAYMENT_STATUS.PAID,
		};

		const queryLimit = parseInt(limit, 10) || 8;
		const queryPage = parseInt(page, 10) || 1;

		const totalOrders = await this.orderModel.countDocuments(where);
		const totalPages = Math.ceil(totalOrders / queryLimit);

		const ordersCompleted = await this.orderModel
			.find(where)
			.sort({ createdAt: -1 })
			.limit(queryLimit * 1)
			.skip((queryPage - 1) * queryLimit)
			.lean()
			.exec();

		const completedReviews = await Promise.all(
			ordersCompleted.flatMap((order) => {
				const orderId = order.orderId;
				const orderDate = order['createdAt'];
				const orderTrackingNumber = order.trackingNumber;
				return order.items
					.filter((item) => item.reviewed)
					.map(async (el) => {
						const product = (await this.productModel
							.findById(el.product)
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
							.exec()) as IProductPopulated;

						if (!product) throw new HttpException('PRODUCT_NOT_FOUND', HttpStatus.NOT_FOUND);

						const productsWithDiscount = applyProductDiscount(product);

						const result = { ...el, orderId, orderDate, orderTrackingNumber, product: productsWithDiscount };

						return result;
					});
			}),
		);

		const groupedCompletedReviews: (typeof completedReviews)[] = completedReviews.reduce((acc: (typeof completedReviews)[], current) => {
			const existingOrder = acc.find((item) => item[0].orderId === current.orderId);
			if (existingOrder) {
				existingOrder.push(current);
			} else {
				acc.push([current]);
			}
			return acc;
		}, []);

		return res.status(HttpStatus.OK).json(
			OkResponse({
				pagination: {
					currentPage: queryPage,
					hasNextPage: queryPage !== totalPages,
					totalItems: totalOrders,
					totalPages: totalPages,
					limit: queryLimit,
				},
				result: groupedCompletedReviews,
			}),
		);
	}

	async getPendingReviewsAsCollection(req: Request, res: Response) {
		const user = req.user as IUser;

		let where = {
			customer: user._id,
			paymentStatus: PAYMENT_STATUS.PAID,
		};

		const ordersPending = await this.orderModel.find(where).lean();

		const pendingReviews = await Promise.all(
			ordersPending.flatMap((order) => {
				const orderId = order.orderId;
				const orderDate = order['createdAt'];
				const orderTrackingNumber = order.trackingNumber;
				return order.items
					.filter((item) => !item.reviewed)
					.map(async (el) => {
						const product = (await this.productModel
							.findById(el.product)
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
							.exec()) as IProductPopulated;

						if (!product) throw new HttpException('PRODUCT_NOT_FOUND', HttpStatus.NOT_FOUND);

						const productsWithDiscount = applyProductDiscount(product);

						const result = { ...el, orderId, orderDate, orderTrackingNumber, product: productsWithDiscount };

						return result;
					});
			}),
		);

		const reviewsAsCollection = pendingReviews.flatMap((el) => el.productSku);

		return res.status(HttpStatus.OK).json(OkResponse(reviewsAsCollection));
	}
}
