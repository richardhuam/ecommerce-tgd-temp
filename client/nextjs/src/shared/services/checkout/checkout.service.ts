import { apiClient } from '../api/api.service';
import { ICreateStripeSessionApiParams, ICreateStripeSessionApiResponse, IGetStripeSessionApiResponse } from './checkout.service.types';

const suffixUrl = '/checkout';
export const checkoutApiUrl = (endpoint?: string) => (endpoint ? `${suffixUrl}${endpoint}` : suffixUrl);

export class CheckoutService {
  public static async createStripeSession(
    createStripeSessionApiParams: ICreateStripeSessionApiParams,
  ): Promise<ICreateStripeSessionApiResponse> {
    const response = await apiClient.post(checkoutApiUrl('/stripe/session'), createStripeSessionApiParams);
    return response.data;
  }

  public static async getStripeSessionById(stripeSessionId: string): Promise<IGetStripeSessionApiResponse> {
    const response = await apiClient.get(checkoutApiUrl(`/stripe/session/${stripeSessionId}`));
    return response.data;
  }
}
