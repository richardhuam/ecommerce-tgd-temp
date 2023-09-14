import { ORDER_PAYMENT_METHOD } from '.';

export interface IPaymentMethod {
  name: ORDER_PAYMENT_METHOD;
  isEnabled: boolean;
  description: string;
}

export const paymentMethodsOptions: IPaymentMethod[] = [
  {
    name: ORDER_PAYMENT_METHOD.STRIPE,
    isEnabled: true,
    description: 'Enables secure online payments for businesses.',
  },
  {
    name: ORDER_PAYMENT_METHOD.DEBIT_OR_CREDIT_CARD,
    isEnabled: false,
    description: 'Card payments offer convenient online transactions.',
  },
];
