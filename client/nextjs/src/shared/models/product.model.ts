import { AxiosRequestConfig } from 'axios';

import { DISCOUNT_TYPE, PRICE_CURRENCY, SHIPPING_METHODS } from '../constants';
import { IUser } from './account.model';
import { IQueryParams } from './api.model';

export type IProductVariants = {
  name: string;
  options: string[];
};

export type IProductSpecifications = {
  [key: string]: string;
};

export type IProductReview = {
  _id: string;
  author: IUser;
  rating: number;
  comment?: string;
  createdAt: string;
  updatedAt: string;
};

export interface IProduct {
  _id: string;
  name: string;
  brand: string;
  category: IProductCategory;
  description: string;
  price: {
    amount: number;
    currency: PRICE_CURRENCY;
  };
  sku: string;
  slug: string;
  inventory: {
    totalStock: number;
    soldItems: number;
    availableStock: number;
    maxPurchasePerUser: number;
  };
  images: {
    main: string;
    subs: string[];
  };
  discount: {
    isActive: boolean;
    type: DISCOUNT_TYPE;
    value: number;
  };
  pricing: {
    regularPrice: number;
    formattedRegularPrice: string;
    discountedPrice: number;
    formattedDiscountedPrice: string;
  };
  score: number;
  views: number;
  lastSoldDate: Date | null;
  reviews: IProductReview[];
  variants: IProductVariants[];
  specifications?: IProductSpecifications;
  createdAt: string;
  updatedAt: string;
}

export interface IProductCategory {
  _id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  code: string;
  position: number;
  createdAt: string;
  updatedAt: string;
}

export type IGetWishlistParams = Pick<IQueryParams, 'page'> & {
  axiosConfig?: AxiosRequestConfig;
  limit?: number;
};

export interface IShippingCosts {
  _id: string;
  shippingMethod: SHIPPING_METHODS;
  baseCost: number;
  description: string;
  shippingMethodWithPrice: string;
  createdAt: string;
  updatedAt: string;
}
