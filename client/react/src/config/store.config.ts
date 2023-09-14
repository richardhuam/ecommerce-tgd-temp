import { authSlice } from '@/features/auth/redux/auth.slice';
import { cartSlice } from '@/features/cart/redux/cart.slice';
import { categorySlice } from '@/features/categories/redux/category.slice';
import { sidebarSlice } from '@/features/layouts/dashboard-layout/dashboard-navigation/dashboard-sidebar/dashboard-sidebar.slice';
import { productSlice } from '@/features/products/redux/product.slice';
import { userSlice } from '@/features/users/redux/user.slice';
import { configureStore } from '@reduxjs/toolkit';

export const reduxStore = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    category: categorySlice.reducer,
    product: productSlice.reducer,
    sidebar: sidebarSlice.reducer,
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
