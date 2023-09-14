import { ICartItem } from '../cart.interface';

export interface ICartSliceState {
  isCartDrawerOpen: boolean;
  cartItems: ICartItem[];
  cartQuantity: number;
  cartTotalPrice: number;
}
