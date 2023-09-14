import { apiClient } from '../api/api.service';
import { IGetWishlistApiParams, IGetWishlistApiResponse, IToggleWishlistApiResponse } from './wishlist.service.types';
import { DEFAULT_GET_WISHLIST_LIMIT } from './wishlist.service.utils';

const suffixUrl = '/wishlist';
export const wishlistApiUrl = (endpoint?: string) => (endpoint ? `${suffixUrl}${endpoint}` : suffixUrl);

export class WishlistService {
  public static async getWishlist({
    page,
    limit = DEFAULT_GET_WISHLIST_LIMIT,
    axiosConfig,
  }: IGetWishlistApiParams): Promise<IGetWishlistApiResponse> {
    const response = await apiClient.get(wishlistApiUrl(`?page=${page}&limit=${limit}`), axiosConfig);
    return response.data;
  }

  public static async toggleWishlist(productId: string): Promise<IToggleWishlistApiResponse> {
    const response = await apiClient.put(wishlistApiUrl(`/${productId}`));
    return response.data;
  }
}
