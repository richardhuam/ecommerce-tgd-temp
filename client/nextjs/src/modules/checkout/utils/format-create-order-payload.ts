import { ICreateStripeSessionApiResponse } from '@/shared/services/checkout/checkout.service.types';
import { ICreateOrderApiParams } from '@/shared/services/order/order.service.types';

type FormatCreateOrderPayloadProps = ICreateStripeSessionApiResponse['data'];
export function formatCreateOrderPayload(props: FormatCreateOrderPayloadProps) {
  const orderPayload: ICreateOrderApiParams = {
    customerId: props.customerId,
    discount: props.discount,
    items: props.items,
    orderId: props.orderId,
    orderNotes: props.orderNotes,
    paymentMethod: props.paymentMethod,
    shipping: props.shipping,
    stripeSessionId: props.stripeSession?.id,
    subTotalPrice: props.subTotalPrice,
    taxes: props.taxes,
    totalItems: props.totalItems,
    totalPrice: props.totalPrice,
    trackingNumber: props.trackingNumber,
    couponCode: undefined,
  };

  return orderPayload;
}
