import { IProduct } from './product.model';

export interface ICartItems {
  product: IProduct;
  quantity: number;
}

export interface IOrderSummaryCartItems {
  product: Partial<IProduct>;
  quantity: number;
}

export interface ICartItemWithProductId {
  productId: string;
  quantity: number;
}
