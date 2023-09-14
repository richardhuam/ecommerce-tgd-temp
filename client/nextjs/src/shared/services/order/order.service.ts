import { apiClient } from '../api/api.service';
import {
  ICreateOrderApiParams,
  ICreateOrderApiResponse,
  IGetOrdersApiParams,
  IGetOrdersApiResponse,
  IValidateOrderApiParams,
  IValidateOrderApiResponse,
  IValidateOrderPaymentStatusApiParams,
  IValidateOrderPaymentStatusApiResponse,
} from './order.service.types';
import { DEFAULT_GET_ORDERS_LIMIT } from './order.service.utils';

const suffixUrl = '/orders';
export const orderApiUrl = (endpoint?: string) => (endpoint ? `${suffixUrl}${endpoint}` : suffixUrl);

export class OrderService {
  public static async validateOrder(validateOrderApiParams: IValidateOrderApiParams): Promise<IValidateOrderApiResponse> {
    const response = await apiClient.post(orderApiUrl('/validate-order'), validateOrderApiParams);
    return response.data;
  }

  public static async createOrder(createOrderApiParams: ICreateOrderApiParams): Promise<ICreateOrderApiResponse> {
    const response = await apiClient.post(orderApiUrl(), createOrderApiParams);
    return response.data;
  }

  public static async validateOrderPaymentStatus(
    createOrderApiParams: IValidateOrderPaymentStatusApiParams,
  ): Promise<IValidateOrderPaymentStatusApiResponse> {
    const response = await apiClient.post(orderApiUrl('/validate-order-payment-status'), createOrderApiParams);
    return response.data;
  }

  public static async getOrders({
    limit = DEFAULT_GET_ORDERS_LIMIT,
    page,
    axiosConfig,
  }: IGetOrdersApiParams): Promise<IGetOrdersApiResponse> {
    const response = await apiClient.get(orderApiUrl(`?page=${page}&limit=${limit}`), axiosConfig);
    return response.data;
  }
}
