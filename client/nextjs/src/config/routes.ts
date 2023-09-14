import { IProduct } from '@/shared/models/product.model';

export const routes = {
  home: '/',
  unauthorized: '/unauthorized',
  orders: '/orders',
  cart: '/cart',
  about: '/about-us',
  contact: '/contact-us',
  reviews: '/reviews',
  wishlist: '/wishlist',
  profile: '/profile',
  checkout: '/checkout',
  login: '/login',
  signUp: '/sign-up',
  trendingProducts: '/products/trending-products',
  bestSellers: '/products/best-sellers',
  newArrivals: '/products/new-arrivals',
  orderUrl: (trackingNumber: string) => `/orders/${trackingNumber}`,
  productUrl: (product: IProduct) => `/products/${product.sku}-${product.slug}`,
  productSearchBase: () => '/products/search/',
  productSearch: (keyWord: string) => `${routes.productSearchBase()}${keyWord}`,
  productCategoriesUrl: (categoryId: string) => `/categories/${categoryId}`,
};
