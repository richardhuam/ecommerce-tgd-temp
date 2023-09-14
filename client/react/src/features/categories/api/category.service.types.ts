import { IApiResponse } from '@/interfaces/api.interface';
import { ICategory } from '../category.interface';
import { IProduct } from '@/features/products/product.interface';

export type IGetAllCategoriesApiResponse = IApiResponse<ICategory[]>;
export type IGetCategoryByIdApiResponse = IApiResponse<ICategory>;
export type IGetProductsByCategoryIdApiResponse = IApiResponse<IProduct[]>;
