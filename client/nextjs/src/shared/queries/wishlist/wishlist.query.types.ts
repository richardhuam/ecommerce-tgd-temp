import { IProduct } from '@/shared/models/product.model';

export type IUseToggleWishlistQueryParams = {
  page: number;
  selectedProduct: IProduct | null;
};
