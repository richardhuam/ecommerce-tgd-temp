import { COUPON_STATUS, DISCOUNT_METHODS, ORDER_PAYMENT_METHOD, SHIPPING_METHODS } from '@/shared/constants';
import { IApiResponse } from '@/shared/models/api.model';
import { ICartItemWithProductId } from '@/shared/models/cart.model';
import { IStripeCreateSession, IStripeSessionResponse } from '@/shared/models/stripe.model';

import { IValidateOrderApiParams } from '../order/order.service.types';

export interface ICreateStripeSessionApiParams extends IValidateOrderApiParams {
  orderNotes?: string;
  customerId: string;
}

export type ICreateStripeSessionApiResponse = IApiResponse<{
  orderId: string;
  trackingNumber: string;
  customerId: string;
  items: ICartItemWithProductId[];
  totalItems: number;
  orderNotes: string | null;
  paymentMethod: ORDER_PAYMENT_METHOD;
  shipping: {
    method: SHIPPING_METHODS;
    baseCost: string;
    totalAmount: string;
    isFree: boolean;
    minOrderAmountForFreeShipping: string;
  };
  taxes: {
    totalAmount: string;
    percent: string;
  };
  discount: {
    method: DISCOUNT_METHODS;
    status: COUPON_STATUS;
    code: string;
    percent: string | null;
    totalAmount: string;
    minOrderAmount: string;
  };

  orderDate: Date;
  subTotalPrice: string;
  totalPrice: string;
  stripeSession: IStripeCreateSession;
}>;

export type IGetStripeSessionApiResponse = IApiResponse<IStripeSessionResponse>;
