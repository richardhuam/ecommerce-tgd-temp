import { apiClient } from '../api/api.service';
import { IGetCouponByCodeApiResponse } from './coupon.service.types';

const suffixUrl = '/coupons';
export const couponApiUrl = (endpoint?: string) => (endpoint ? `${suffixUrl}${endpoint}` : suffixUrl);

export class CouponService {
  public static async getCouponByCode(couponCode: string): Promise<IGetCouponByCodeApiResponse> {
    const response = await apiClient.post(couponApiUrl(`/${couponCode}`));
    return response.data;
  }
}
