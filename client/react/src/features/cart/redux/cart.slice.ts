import { createSlice } from '@reduxjs/toolkit';
import { ICartSliceState } from './cart.slice.interface';

const initialState: ICartSliceState = {
  isCartDrawerOpen: false,
  cartItems: [],
  cartQuantity: 0,
  cartTotalPrice: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    openCartDrawer: state => {
      state.isCartDrawerOpen = true;
    },
    closeCartDrawer: state => {
      state.isCartDrawerOpen = false;
    },
    toggleCartDrawer: state => {
      state.isCartDrawerOpen = !state.isCartDrawerOpen;
    },
  },
});

export const CartActions = cartSlice.actions;
