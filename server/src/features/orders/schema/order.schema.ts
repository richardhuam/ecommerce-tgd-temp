import {
	COLLECTION_NAMES,
	COUPON_STATUS,
	DISCOUNT_METHODS,
	ORDER_PAYMENT_METHOD,
	ORDER_STATUS,
	PAYMENT_STATUS,
	SHIPPING_METHOD,
} from '@common/constants';
import { IOrderDiscount, IOrderItem, IOrderShipping, IOrderTaxes } from '@common/models';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Model } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;
export type OrderModel = Model<OrderDocument>;

@Schema({
	timestamps: true,
	collection: COLLECTION_NAMES.ORDER,
})
export class Order {
	@Prop({
		required: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
	})
	customer: mongoose.Schema.Types.ObjectId;

	@Prop({ required: true })
	orderId: string;

	@Prop({ required: true })
	trackingNumber: string;

	@Prop([
		{
			product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'products' },
			productSku: { type: String, required: true },
			quantity: { type: Number, required: true },
			reviewed: { type: Boolean, required: false, default: false },
		},
	])
	items: IOrderItem[];

	@Prop({ required: true })
	totalItems: number;

	@Prop({
		required: true,
		enum: [
			ORDER_STATUS.CANCELLED,
			ORDER_STATUS.DELIVERED,
			ORDER_STATUS.IN_TRANSIT,
			ORDER_STATUS.ORDER_CONFIRMED,
			ORDER_STATUS.ORDER_PLACED,
			ORDER_STATUS.ORDER_PROCESSING,
			ORDER_STATUS.ORDER_SHIPPED,
			ORDER_STATUS.OUT_FOR_DELIVERY,
			ORDER_STATUS.PENDING_PAYMENT,
			ORDER_STATUS.REFUNDED,
			ORDER_STATUS.RETURNED,
		],
	})
	orderStatus: ORDER_STATUS;

	@Prop({
		enum: [PAYMENT_STATUS.PAID, PAYMENT_STATUS.NOT_PAID, PAYMENT_STATUS.REFUNDED],
		default: PAYMENT_STATUS.NOT_PAID,
	})
	paymentStatus: PAYMENT_STATUS;

	@Prop({ required: false, default: null })
	orderNotes: string | null;

	@Prop({
		required: true,
		enum: [ORDER_PAYMENT_METHOD.STRIPE, ORDER_PAYMENT_METHOD.DEBIT_OR_CREDIT_CARD],
	})
	paymentMethod: ORDER_PAYMENT_METHOD;

	@Prop({
		type: Object,
		method: {
			type: String,
			required: true,
			enum: [SHIPPING_METHOD.EXPRESS, SHIPPING_METHOD.STANDARD],
		},
		baseCost: { type: String, required: true },
		totalAmount: { type: String, required: true },
		isFree: { type: Boolean, required: true },
		minOrderAmountForFreeShipping: { type: String, required: true },
	})
	shipping: IOrderShipping;

	@Prop({
		type: Object,
		percent: { type: String, required: true },
		totalAmount: { type: String, required: true },
	})
	taxes: IOrderTaxes;

	@Prop({
		type: Object,
		method: {
			required: true,
			enum: [DISCOUNT_METHODS.COUPON],
		},
		status: {
			required: true,
			enum: [
				COUPON_STATUS.APPLIED,
				COUPON_STATUS.EXPIRED,
				COUPON_STATUS.INCORRECT_COUPON,
				COUPON_STATUS.IS_INACTIVE,
				COUPON_STATUS.MIN_AMOUNT_ERROR,
				COUPON_STATUS.NOT_APPLICABLE,
				COUPON_STATUS.NOT_APPLIED,
			],
		},
		code: { type: String || null },
		percent: { type: String, required: true },
		totalAmount: { type: String, required: true },
		minOrderAmount: { type: String, required: true },
	})
	discount: IOrderDiscount;

	@Prop({ required: true })
	subTotalPrice: string;

	@Prop({ required: true })
	totalPrice: string;

	@Prop({ required: true })
	stripeSessionId: string;

	@Prop({ required: false, default: null })
	orderPaidDate: mongoose.Schema.Types.Date | null;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
