import { IApiResponse } from '@/shared/models/api.model';
import { IShippingCosts } from '@/shared/models/product.model';

export type IGetShippingCostsApiResponse = IApiResponse<IShippingCosts[]>;

export type IGetShippingCostByIdApiResponse = IApiResponse<IShippingCosts>;
