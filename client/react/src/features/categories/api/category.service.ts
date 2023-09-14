import { apiClient } from '@/config/axios.config';
import {
  IGetAllCategoriesApiResponse,
  IGetCategoryByIdApiResponse,
  IGetProductsByCategoryIdApiResponse,
} from './category.service.types';

const suffixUrl = '/categories';
export const categoryApiUrl = (endpoint?: string) => (endpoint ? `${suffixUrl}${endpoint}` : suffixUrl);

export class CategoryService {
  public static async getAllCategories(): Promise<IGetAllCategoriesApiResponse> {
    const response = await apiClient.get(categoryApiUrl());
    return response.data;
  }

  public static async getCategoryById(categoryId: string): Promise<IGetCategoryByIdApiResponse> {
    const response = await apiClient.get(categoryApiUrl(`/${categoryId}`));
    return response.data;
  }

  public static async getProductsByCategoryId(categoryId: string): Promise<IGetProductsByCategoryIdApiResponse> {
    const response = await apiClient.get(categoryApiUrl(`/${categoryId}/products`));
    return response.data;
  }
}
