import { apiClient } from '@/config/axios.config';
import {
  IGetBestSellersApiParams,
  IGetBestSellersApiResponse,
  IGetLimitedBestSellersApiResponse,
  IGetLimitedNewArrivalsApiResponse,
  IGetLimitedTrendingProductsApiResponse,
  IGetNewArrivalsApiParams,
  IGetNewArrivalsApiResponse,
  IGetProductByIdApiResponse,
  IGetProductBySkuApiResponse,
  IGetRecommendedProductsApiResponse,
  IGetTrendingProductsApiParams,
  IGetTrendingProductsApiResponse,
  ISearchProductsApiParams,
  ISearchProductsApiResponse,
  IViewProductApiResponse,
} from './product.service.types';
import {
  DEFAULT_GET_BEST_SELLERS_LIMIT,
  DEFAULT_GET_NEW_ARRIVALS_LIMIT,
  DEFAULT_GET_TRENDING_PRODUCTS_LIMIT,
  DEFAULT_SEARCH_PRODUCTS_LIMIT,
} from './product.service.utils';

const suffixUrl = '/products';
export const productApiUrl = (endpoint?: string) => (endpoint ? `${suffixUrl}${endpoint}` : suffixUrl);

export class ProductService {
  public static async getLimitedBestSellers(): Promise<IGetLimitedBestSellersApiResponse> {
    const response = await apiClient.get(productApiUrl('/best-sellers'));
    return response.data;
  }

  public static async getLimitedNewArrivals(): Promise<IGetLimitedNewArrivalsApiResponse> {
    const response = await apiClient.get(productApiUrl('/new-arrivals'));
    return response.data;
  }

  public static async getLimitedTrendingProducts(): Promise<IGetLimitedTrendingProductsApiResponse> {
    const response = await apiClient.get(productApiUrl('/trending-products'));
    return response.data;
  }

  public static async getBestSellers({
    page,
    limit = DEFAULT_GET_BEST_SELLERS_LIMIT,
  }: IGetBestSellersApiParams): Promise<IGetBestSellersApiResponse> {
    const response = await apiClient.get(productApiUrl(`/best-sellers?page=${page}&limit=${limit}`));
    return response.data;
  }

  public static async getNewArrivals({
    page,
    limit = DEFAULT_GET_NEW_ARRIVALS_LIMIT,
  }: IGetNewArrivalsApiParams): Promise<IGetNewArrivalsApiResponse> {
    const response = await apiClient.get(productApiUrl(`/new-arrivals?page=${page}&limit=${limit}`));
    return response.data;
  }

  public static async getTrendingProducts({
    page,
    limit = DEFAULT_GET_TRENDING_PRODUCTS_LIMIT,
  }: IGetTrendingProductsApiParams): Promise<IGetTrendingProductsApiResponse> {
    const response = await apiClient.get(productApiUrl(`/trending-products?page=${page}&limit=${limit}`));
    return response.data;
  }

  public static async viewProduct(productId: string): Promise<IViewProductApiResponse> {
    const response = await apiClient.post(productApiUrl(`/view-product/${productId}`));
    return response.data;
  }

  public static async searchProducts({
    keyWord,
    limit = DEFAULT_SEARCH_PRODUCTS_LIMIT,
    page,
  }: ISearchProductsApiParams): Promise<ISearchProductsApiResponse> {
    const response = await apiClient.get(productApiUrl(`/search?keyword=${keyWord}&page=${page}&limit=${limit}`));
    return response.data;
  }

  public static async getProductBySku(productSKU: string): Promise<IGetProductBySkuApiResponse> {
    const response = await apiClient.get(productApiUrl(`/sku/${productSKU}`));
    return response.data;
  }

  public static async getRecommendedProducts(productId: string): Promise<IGetRecommendedProductsApiResponse> {
    const response = await apiClient.get(productApiUrl(`/${productId}/recommended`));
    return response.data;
  }

  public static async getProductById(productId: string): Promise<IGetProductByIdApiResponse> {
    const response = await apiClient.get(productApiUrl(`/${productId}`));
    return response.data;
  }
}
