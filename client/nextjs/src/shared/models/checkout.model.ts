import { DISCOUNT_TYPE, ORDER_PAYMENT_METHOD } from '../constants';
import { IUserAddress } from './account.model';
import { IOrderSummaryCartItems } from './cart.model';
import { IShippingCosts } from './product.model';

export interface ICheckoutFormParams {
  user: {
    firstName: string;
    lastName: string;
    address: IUserAddress;
    phone: string;
    email: string;
  };
  order: {
    coupon: string;
    orderNotes: string;
    shippingCost: IShippingCosts;
    paymentMethod: ORDER_PAYMENT_METHOD;
  };
}

export interface IOrderSummary {
  userId: string;
  coupon: string;
  orderNotes: string;
  products: IOrderSummaryCartItems[];
  paymentMethod: ORDER_PAYMENT_METHOD.STRIPE;
  orderFinancialSummary: IOrderFinancialSummary;
  shippingCostId: string;
  /* selectedShippingCost */
}

export type IOrderFinancialSummary = {
  subTotal: string;
  discount: {
    value: string;
    type: DISCOUNT_TYPE | null;
    status: boolean;
  };
  isShippingFree: boolean;
  shippingCost: string;
  taxesAmount: string;
  totalPrice: string;
  totalPriceWithDiscount: string;
};
