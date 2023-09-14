import { COUPON_STATUS, DISCOUNT_METHODS, ORDER_PAYMENT_METHOD, ORDER_STATUS, SHIPPING_METHODS } from '../constants';
import { PAYMENT_STATUS } from '../constants/order-status';
import { IUser } from './account.model';
import { IProduct } from './product.model';
import { IStripeCreateSession } from './stripe.model';

type IOrderItems = {
  product: Pick<IProduct, '_id' | 'name' | 'brand' | 'slug' | 'discount' | 'sku'> & {
    pricing: IProduct['pricing'] & { totalProductPrice: string };
  };
  quantity: number;
};

export interface IValidateOrderSummary {
  items: IOrderItems[];
  totalItems: number;
  subTotalPrice: string;
  totalPrice: string;
  shipping: {
    method: string;
    baseCost: string;
    totalAmount: string;
    isFree: boolean;
    minOrderPriceForFreeShipping: string;
  };
  taxes: {
    totalAmount: string;
    percent: string;
  };
  discount: {
    method: DISCOUNT_METHODS;
    status: COUPON_STATUS;
    code: string;
    percent: string;
    totalAmount: string;
    minOrderAmount: string;
  };
}

export interface IOrder {
  _id: string;
  orderId: string;
  trackingNumber: string;
  customer: IUser;
  items: {
    product: IProduct;
    productSku: string;
    quantity: number;
    reviewed: boolean;
  }[];
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
  orderPaidDate: Date | null;
  stripePaymentDetails: IStripeCreateSession;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderShipping {
  method: SHIPPING_METHODS;
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
