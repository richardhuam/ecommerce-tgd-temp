import { apiClient } from '../api/api.service';
import { IGetShippingCostByIdApiResponse, IGetShippingCostsApiResponse } from './shipping-cost.service.types';

const suffixUrl = '/shipping-costs';
export const shippingCostsApiUrl = (endpoint?: string) => (endpoint ? `${suffixUrl}${endpoint}` : suffixUrl);

export class ShippingCostService {
  public static async getShippingCosts(): Promise<IGetShippingCostsApiResponse> {
    const response = await apiClient.get(shippingCostsApiUrl());
    return response.data;
  }

  public static async getShippingCostById(shippingCostId: string): Promise<IGetShippingCostByIdApiResponse> {
    const response = await apiClient.get(shippingCostsApiUrl(`/${shippingCostId}`));
    return response.data;
  }
}
