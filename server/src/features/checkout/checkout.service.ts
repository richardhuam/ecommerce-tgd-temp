import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductModel } from '@features/products/schema/product.schema';
import { Review, ReviewModel } from '@features/reviews/schema/review.schema';
import { Coupon, CouponModel } from '@features/coupons/schema/coupon.schema';
import { ShippingCost } from '@features/shipping-costs/entities/shipping-cost.entity';
import { User, UserModel } from '@features/users/schema/user.schema';
import { ShippingCostModel } from '@features/shipping-costs/schema/shipping-cost.schema';
import { CreateStripeSessionDto } from './dto/create-stripe-session';
import { ICoupon, IShippingCost } from '@common/models';
import { OkResponse, formatCurrency } from '@common/utils';
import { DISCOUNT_METHODS, ORDER_PAYMENT_METHOD, PRODUCT_FREE_SHIPPING_COST_LIMIT, PRODUCT_TAX_PERCENT } from '@common/constants';
import { stripeClient } from '@common/libs/stripe.lib';
import { getOrderProducts } from '@common/utils/products/get-order-products.utils';
import { calculateProductsTotalPrice } from '@common/utils/products/calculate-products-total-price';
import { calculateOrderTotals } from '@common/utils/products/calculate-order-totals';
import { validateCoupon } from '@common/utils/products/validate-coupon.utils';
import { envConfig } from '@config/environment';
import { createTrackingNumber } from '@common/utils/products/create-tracking-number';
import { createOrderId } from '@common/utils/products/create-order-id';
import { IStripeSessionResponse } from '@common/models/stripe.model';

@Injectable()
export class CheckoutService {
	constructor(
		@InjectModel(Product.name) private readonly productModel: ProductModel,
		@InjectModel(Review.name) private readonly reviewModel: ReviewModel,
		@InjectModel(Coupon.name) private readonly couponModel: CouponModel,
		@InjectModel(ShippingCost.name) private readonly shippingCostModel: ShippingCostModel,
		@InjectModel(User.name) private readonly userModel: UserModel,
	) {}

	async getStripeSessionById(sessionId: string) {
		if (!sessionId.startsWith('cs_')) {
			throw new HttpException('INVALID_STRIPE_SESSION_ID', HttpStatus.BAD_REQUEST);
		}

		const checkoutSession: IStripeSessionResponse = await stripeClient.checkout.sessions
			.retrieve(sessionId, {
				expand: ['payment_intent', 'line_items.data.price.product'],
			})
			.catch((error) => {
				if (error.statusCode === HttpStatus.NOT_FOUND) {
					throw new HttpException('STRIPE_SESSION_NOT_FOUND', HttpStatus.NOT_FOUND);
				} else {
					throw new HttpException('CRITICAL_INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
				}
			});

		return OkResponse(checkoutSession);
	}

	async createStripeSession(createStripeSessionDto: CreateStripeSessionDto) {
		let couponDetails: ICoupon | null | undefined = undefined;
		let shippingDetails: IShippingCost | null = null;
		let stripePayment = null;

		const customer = await this.userModel.findById(createStripeSessionDto.customerId).lean();
		if (!customer) throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);

		if (createStripeSessionDto.shippingCostId) {
			shippingDetails = (await this.shippingCostModel.findById(createStripeSessionDto.shippingCostId).lean()) as IShippingCost;
		}

		if (!shippingDetails) throw new HttpException('PRODUCT_NOT_FOUND', HttpStatus.NOT_FOUND);

		// if coupon code find the coupon
		if (createStripeSessionDto.couponCode) {
			couponDetails = (await this.couponModel.findOne({ code: createStripeSessionDto.couponCode.toUpperCase() }).lean()) as ICoupon;
		}

		const products = await getOrderProducts({
			productModel: this.productModel,
			products: createStripeSessionDto.products,
			reviewModel: this.reviewModel,
		});

		const { productsTotalPrice, itemsQuantity, shippingCostAllProducts } = calculateProductsTotalPrice({ products, shippingDetails });
		const { discountPrice, couponStatus, couponPercentDiscount, couponMinOrderAmount } = validateCoupon(
			productsTotalPrice,
			couponDetails,
			createStripeSessionDto.paymentMethod,
		);

		const { discountAmount, isShippingFree, shippingAmount, subTotal, taxesAmount, totalPrice } = calculateOrderTotals({
			couponStatus,
			discountPrice,
			productsTotalPrice,
			shippingCostAllProducts,
		});

		const orderId = createOrderId();

		// stripe checkout
		if (createStripeSessionDto.paymentMethod === ORDER_PAYMENT_METHOD.STRIPE) {
			stripePayment = await stripeClient.checkout.sessions.create({
				line_items: products.map((item) => {
					const productWithDiscountPrice = item.product.pricing.discountedPrice;
					const shippingCostPerProductPrice = shippingDetails && !isShippingFree ? shippingDetails.baseCost : 0;

					return {
						price_data: {
							product_data: {
								name: item.product.name,
								description: item.product.description,
							},
							currency: 'usd',
							unit_amount: Math.floor(productWithDiscountPrice + shippingCostPerProductPrice),
						},
						quantity: item.quantity,
					};
				}),
				mode: 'payment',
				//success_url: `${envConfig().stripe.clientSuccessUrl}?sessionId={CHECKOUT_SESSION_ID}`,
				success_url: `${envConfig().stripe.clientSuccessUrl}?orderId=${orderId}`,
				cancel_url: envConfig().stripe.clientFailureUrl,
			});
		}

		return OkResponse({
			orderId,
			trackingNumber: createTrackingNumber(),
			customerId: customer._id,
			items: createStripeSessionDto.products,
			totalItems: itemsQuantity,
			orderNotes: createStripeSessionDto.orderNotes ? createStripeSessionDto.orderNotes : null,
			paymentMethod: createStripeSessionDto.paymentMethod,
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
				code: createStripeSessionDto.couponCode ?? null,
				percent: couponPercentDiscount,
				totalAmount: formatCurrency(discountAmount),
				minOrderAmount: formatCurrency(couponMinOrderAmount),
			},
			orderDate: new Date(),
			subTotalPrice: formatCurrency(subTotal),
			totalPrice: formatCurrency(totalPrice),
			stripeSession: stripePayment,
		});
	}
}
