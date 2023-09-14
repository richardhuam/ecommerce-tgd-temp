import { COUPON_STATUS, DISCOUNT_METHODS, ORDER_PAYMENT_METHOD, ORDER_STATUS, PAYMENT_STATUS, SHIPPING_METHOD } from '@common/constants';
import mongoose from 'mongoose';
import { IProduct } from './product-model';
import { IUser } from './user.model';

export interface IOrderItem {
	product: mongoose.Schema.Types.ObjectId[];
	productSku: string;
	quantity: number;
	reviewed: boolean;
}

export interface IOrderShipping {
	method: SHIPPING_METHOD;
	baseCost: string;
	totalAmount: string;
	isFree: boolean;
	minOrderAmountForFreeShipping: string;
}

export interface IOrderTaxes {
	totalAmount: string;
	percent: string;
}

export interface IOrderDiscount {
	method: DISCOUNT_METHODS;
	status: COUPON_STATUS;
	code: string | null;
	percent: string;
	totalAmount: string;
	minOrderAmount: string;
}

export interface IOrder {
	_id: mongoose.Schema.Types.ObjectId;
	orderId: string;
	trackingNumber: string;
	customer: mongoose.Schema.Types.ObjectId;
	items: IOrderItem[];
	totalItems: number;
	orderStatus: ORDER_STATUS;
	paymentStatus: PAYMENT_STATUS;
	orderNotes: string | null;
	paymentMethod: ORDER_PAYMENT_METHOD;
	shipping: IOrderShipping;
	taxes: IOrderTaxes;
	discount: IOrderDiscount;
	subTotalPrice: string;
	totalPrice: string;
	stripeSession: string | null;
	orderPaidDate: mongoose.Schema.Types.Date | null;
}

export interface IOrderPopulated extends Omit<IOrder, 'items' | 'customer'> {
	items: {
		product: IProduct;
		productSku: string;
		quantity: number;
		reviewed: boolean;
		_id: string;
	}[];
	customer: IUser;
}
