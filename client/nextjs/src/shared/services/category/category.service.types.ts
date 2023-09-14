import { IApiResponse } from '@/shared/models/api.model';
import { IProduct, IProductCategory } from '@/shared/models/product.model';

export type IGetAllCategoriesApiResponse = IApiResponse<IProductCategory[]>;
export type IGetCategoryByIdApiResponse = IApiResponse<IProductCategory>;
export type IGetProductsByCategoryIdApiResponse = IApiResponse<IProduct[]>;
