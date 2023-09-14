import { ICategory } from '../categories/category.interface';
import { IUser } from '../users/interfaces/user.interface';
import { DISCOUNT_TYPE, PRICE_CURRENCY } from './product.constant';

export interface IProduct {
  _id: string;
  name: string;
  brand: string;
  category: ICategory;
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

export type IProductReview = {
  _id: string;
  author: IUser;
  rating: number;
  comment?: string;
  createdAt: string;
  updatedAt: string;
};

export type IProductVariants = {
  name: string;
  options: string[];
};

export type IProductSpecifications = {
  [key: string]: string;
};
