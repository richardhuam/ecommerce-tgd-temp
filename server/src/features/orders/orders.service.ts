import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ICoupon, IOrder, IProductPopulated, IShippingCost, IUser } from '@common/models';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductModel } from '@features/products/schema/product.schema';
import { Review, ReviewModel } from '@features/reviews/schema/review.schema';
import { OkResponse } from '@common/utils';
import { ShippingCost } from '@features/shipping-costs/entities/shipping-cost.entity';
import { ShippingCostModel } from '@features/shipping-costs/schema/shipping-cost.schema';
import { ValidateOrderDto } from './dto/validate-order.dto';
import { formatCurrency } from '@common/utils/products/format-currency';
import { Coupon, CouponModel } from '@features/coupons/schema/coupon.schema';
import {
	DISCOUNT_METHODS,
	ORDER_PAYMENT_METHOD,
	ORDER_STATUS,
	PAYMENT_STATUS,
	PRODUCT_FREE_SHIPPING_COST_LIMIT,
	PRODUCT_TAX_PERCENT,
} from '@common/constants';
import { User, UserModel } from '@features/users/schema/user.schema';
import { getOrderProducts } from '@common/utils/products/get-order-products.utils';
import { calculateProductsTotalPrice } from '@common/utils/products/calculate-products-total-price';
import { validateCoupon } from '@common/utils/products/validate-coupon.utils';
import { calculateOrderTotals } from '@common/utils/products/calculate-order-totals';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order, OrderModel } from './schema/order.schema';
import { CheckoutService } from '@features/checkout/checkout.service';
import { IStripeSessionResponse } from '@common/models/stripe.model';
import { ValidateOrderPaymentDto } from './dto/validate-order-payment';
import { Request, Response } from 'express';
import { GetOrderParams } from './interfaces/get-orders-params';
import { Category, CategoryModel } from '@features/categories/schema/category.schema';

@Injectable()
export class OrdersService {
	constructor(
		@InjectModel(Product.name) private readonly productModel: ProductModel,
		@InjectModel(Review.name) private readonly reviewModel: ReviewModel,
		@InjectModel(Category.name) private readonly categoryModel: CategoryModel,
		@InjectModel(Order.name) private readonly orderModel: OrderModel,
		@InjectModel(Coupon.name) private readonly couponModel: CouponModel,
		@InjectModel(ShippingCost.name) private readonly shippingCostModel: ShippingCostModel,
		@InjectModel(User.name) private readonly userModel: UserModel,
		private readonly checkoutService: CheckoutService,
	) {}

	async validateOrder(validateOrderDto: ValidateOrderDto) {
		let couponDetails: ICoupon | null | undefined = undefined;
		let shippingDetails: IShippingCost | null = null;

		if (validateOrderDto.shippingCostId) {
			shippingDetails = (await this.shippingCostModel.findById(validateOrderDto.shippingCostId).lean()) as IShippingCost;
		}

		if (!shippingDetails) throw new HttpException('PRODUCT_NOT_FOUND', HttpStatus.NOT_FOUND);

		// if coupon code find the coupon
		if (validateOrderDto.couponCode) {
			couponDetails = (await this.couponModel.findOne({ code: validateOrderDto.couponCode.toUpperCase() }).lean()) as ICoupon;
		}

		const products = await getOrderProducts({
			productModel: this.productModel,
			products: validateOrderDto.products,
			reviewModel: this.reviewModel,
		});

		const { productsTotalPrice, itemsQuantity, shippingCostAllProducts } = calculateProductsTotalPrice({ products, shippingDetails });
		const { discountPrice, couponStatus, couponPercentDiscount, couponMinOrderAmount } = validateCoupon(
			productsTotalPrice,
			couponDetails,
			validateOrderDto.paymentMethod,
		);

		const { discountAmount, isShippingFree, shippingAmount, subTotal, taxesAmount, totalPrice } = calculateOrderTotals({
			couponStatus,
			discountPrice,
			productsTotalPrice,
			shippingCostAllProducts,
		});

		return OkResponse({
			items: products,
			totalItems: itemsQuantity,
			subTotalPrice: formatCurrency(subTotal),
			totalPrice: formatCurrency(totalPrice),
			shipping: {
				method: shippingDetails ? shippingDetails.shippingMethod : null,
				baseCost: formatCurrency(shippingDetails.baseCost),
				totalAmount: formatCurrency(shippingAmount),
				isFree: isShippingFree,
				minOrderPriceForFreeShipping: formatCurrency(PRODUCT_FREE_SHIPPING_COST_LIMIT),
			},
			taxes: {
				totalAmount: formatCurrency(taxesAmount),
				percent: `${PRODUCT_TAX_PERCENT}%`,
			},
			discount: {
				method: DISCOUNT_METHODS.COUPON,
				status: couponStatus,
				code: validateOrderDto.couponCode ?? null,
				percent: couponPercentDiscount,
				totalAmount: formatCurrency(discountAmount),
				minOrderAmount: formatCurrency(couponMinOrderAmount),
			},
		});
	}

	async createOrder(createOrderDto: CreateOrderDto) {
		const customer = await this.userModel.findById(createOrderDto.customerId).lean();
		if (!customer) throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);

		if (!createOrderDto.stripeSessionId.startsWith('cs_')) {
			throw new HttpException('INVALID_STRIPE_SESSION_ID', HttpStatus.BAD_REQUEST);
		}

		const isOrderAlreadyCreated = await this.orderModel.findOne({ stripeSession: createOrderDto.stripeSessionId });

		if (isOrderAlreadyCreated) {
			throw new HttpException('ORDER_ALREADY_REGISTERED', HttpStatus.BAD_REQUEST);
		}

		// Validate products
		const products = await getOrderProducts({
			productModel: this.productModel,
			products: createOrderDto.items,
			reviewModel: this.reviewModel,
		});

		await Promise.all(
			products.map(async (item) => {
				const product = await this.productModel.findById(item.product._id).lean();

				if (!product) {
					throw new HttpException('PRODUCT_NOT_FOUND', HttpStatus.NOT_FOUND);
				}

				await this.productModel.updateOne(
					{ _id: item.product._id },
					{
						$set: { lastSoldDate: new Date() },
						$inc: { 'inventory.soldItems': item.quantity, 'inventory.availableStock': -item.quantity },
					},
				);

				return null;
			}),
		);

		const formattedItems = await Promise.all(
			createOrderDto.items.map(async (product) => {
				const foundProduct = await this.productModel.findById(product.productId).lean();
				return {
					product: product.productId,
					quantity: product.quantity,
					productSku: foundProduct.sku,
				};
			}),
		);

		const createOrderPayload = {
			...createOrderDto,
			orderStatus: ORDER_STATUS.PENDING_PAYMENT,
			customer: createOrderDto.customerId,
			items: formattedItems,
		};

		const orderResult = await this.orderModel.create(createOrderPayload);

		return OkResponse(orderResult);
	}

	async validateOrderPayment(validateOrderPaymentDto: ValidateOrderPaymentDto, req: Request, res: Response) {
		const customer = req.user as IUser;

		const order = await this.orderModel.findOne({ orderId: validateOrderPaymentDto.orderId }).lean();

		if (!order) throw new HttpException('ORDER_NOT_FOUND', HttpStatus.NOT_FOUND);

		if (customer._id.toString() !== order.customer.toString()) throw new HttpException('USER_NOT_AUTHORIZED', HttpStatus.UNAUTHORIZED);

		let stripeSession: IStripeSessionResponse | null = null;
		let newOrderState: IOrder | null = null;

		if (order.paymentMethod === ORDER_PAYMENT_METHOD.STRIPE) {
			const stripe = await this.checkoutService.getStripeSessionById(order.stripeSessionId);
			stripeSession = stripe.ok ? stripe.data : null;
		}

		if (!stripeSession) throw new HttpException('INVALID_STRIPE_SESSION_ID', HttpStatus.BAD_REQUEST);

		if (order.orderStatus === ORDER_STATUS.PENDING_PAYMENT && stripeSession.payment_status === 'paid') {
			newOrderState = (await this.orderModel
				.findOneAndUpdate(
					{ orderId: validateOrderPaymentDto.orderId },
					{ orderStatus: ORDER_STATUS.ORDER_PLACED, orderPaidDate: new Date(), paymentStatus: PAYMENT_STATUS.PAID },
					{ new: true },
				)
				.lean()) as IOrder;

			return res
				.status(HttpStatus.OK)
				.json(OkResponse({ paymentStatus: newOrderState.paymentStatus, isNewPayment: true, trackingNumber: newOrderState.trackingNumber }));
		}

		return res.status(HttpStatus.OK).json(
			OkResponse({
				paymentStatus: order.paymentStatus,
				isNewPayment: false,
				trackingNumber: order.trackingNumber,
				orderPaidDate: order.orderPaidDate,
			}),
		);
	}

	async getOrders({ limit, page, req, res }: GetOrderParams) {
		const queryLimit = parseInt(limit, 10) || 8;
		const queryPage = parseInt(page, 10) || 1;
		let formattedOrders = [];

		const user = req.user as IUser;

		const totalOrders = await this.orderModel.countDocuments();

		const totalPages = Math.ceil(totalOrders / queryLimit);

		const orders = await this.orderModel
			.find({ customer: user._id })
			.limit(queryLimit * 1)
			.skip((queryPage - 1) * queryLimit)
			.sort({ createdAt: 'desc' })
			.lean()
			.exec();

		if (orders.length > 0) {
			formattedOrders = await Promise.all(
				orders.map(async (item) => {
					const items = await Promise.all(
						item.items.map(async (i) => {
							const populatedProducts = (await this.productModel
								.findById(i.product)
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
							return { product: populatedProducts, quantity: i.quantity, reviewed: i.reviewed };
						}),
					);
					const stripePayment = await this.checkoutService.getStripeSessionById(item.stripeSessionId);
					const stripePaymentDetails = stripePayment.ok ? stripePayment.data : null;
					return { ...item, stripePaymentDetails, items };
				}),
			);
		}

		return res.status(HttpStatus.OK).json(
			OkResponse({
				pagination: {
					currentPage: queryPage,
					hasNextPage: queryPage !== totalPages,
					totalItems: totalOrders,
					totalPages,
					limit: queryLimit,
				},
				result: formattedOrders,
			}),
		);
	}
}
