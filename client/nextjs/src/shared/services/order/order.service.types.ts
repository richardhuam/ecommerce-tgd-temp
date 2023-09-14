import { AxiosRequestConfig } from 'axios';

import { COUPON_STATUS, DISCOUNT_METHODS, ORDER_PAYMENT_METHOD, SHIPPING_METHODS } from '@/shared/constants';
import { PAYMENT_STATUS } from '@/shared/constants/order-status';
import { IApiResponse, IPagination, IQueryParams } from '@/shared/models/api.model';
import { ICartItems, ICartItemWithProductId } from '@/shared/models/cart.model';
import { IOrder, IValidateOrderSummary } from '@/shared/models/order.model';

export type IValidateOrderApiParams = {
  products: ICartItemWithProductId[];
  couponCode?: string;
  shippingCostId: string;
  paymentMethod: ORDER_PAYMENT_METHOD;
};

export type ICreateOrderApiParams = {
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
  couponCode?: string;
  subTotalPrice: string;
  totalPrice: string;
  stripeSessionId: string;
};

export type IGetOrdersApiParams = Pick<IQueryParams, 'page'> &
  Partial<Pick<IQueryParams, 'limit'>> & {
    axiosConfig?: AxiosRequestConfig;
  };

export interface ICreateOrderResponse extends Omit<ICreateOrderApiParams, 'customerId' | 'items' | 'stripeSessionId'> {
  customer: string;
  items: ICartItems[];
  stripeSession: string;
}

export interface IValidateOrderPaymentStatusApiParams {
  orderId: string;
}

export type IValidateOrderApiResponse = IApiResponse<IValidateOrderSummary>;
export type ICreateOrderApiResponse = IApiResponse<ICreateOrderResponse>;
export type IValidateOrderPaymentStatusApiResponse = IApiResponse<{
  paymentStatus: PAYMENT_STATUS;
  isNewPayment: boolean;
  trackingNumber: string;
  orderPaidDate: Date;
}>;

export type IGetOrdersApiResponse = IApiResponse<{
  result: IOrder[];
  pagination: Omit<IPagination, 'query'>;
}>;
