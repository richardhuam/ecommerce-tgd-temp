const DASHBOARD_PREFIX = '/dashboard';
const STORE_PREFIX = '/store';

export const DASHBOARD_ROUTES = {
  INDEX: DASHBOARD_PREFIX,
  OVERVIEW: `${DASHBOARD_PREFIX}/overview`,
  INVOICE: {
    INDEX: `${DASHBOARD_PREFIX}/invoice/`,
    DETAILS: `${DASHBOARD_PREFIX}/invoice/details`,
    LIST: `${DASHBOARD_PREFIX}/invoice/list`,
    ADD: `${DASHBOARD_PREFIX}/invoice/add`,
  },
  PRODUCTS: {
    INDEX: `${DASHBOARD_PREFIX}/products/`,
    LIST: `${DASHBOARD_PREFIX}/products/list`,
    ADD: `${DASHBOARD_PREFIX}/products/add`,
  },
};

export const STORE_ROUTES = {
  INDEX: STORE_PREFIX,
  HOME: `${STORE_PREFIX}/home`,
  REVIEWS: `${STORE_PREFIX}/reviews`,
  ORDERS: `${STORE_PREFIX}/orders`,
  CART: `${STORE_PREFIX}/cart`,
  ABOUT: `${STORE_PREFIX}/about`,
  CONTACT: `${STORE_PREFIX}/contact`,
  WISHLIST: `${STORE_PREFIX}/wishlist`,
  PROFILE: `${STORE_PREFIX}/profile`,
  CHECKOUT: `${STORE_PREFIX}/checkout`,
  LOGIN: `${STORE_PREFIX}/login`,
  SIGN_UP: `${STORE_PREFIX}/sign-up`,
  UNAUTHORIZED: `${STORE_PREFIX}/unauthorized`,
  NOT_FOUND: `${STORE_PREFIX}/404`,
  ERROR: `${STORE_PREFIX}/error`,
  PRODUCTS: `${STORE_PREFIX}/products`,
  //PRODUCT_DETAILS: `${STORE_PREFIX}/products/:productIdentifier`,
  PRODUCTS_CATEGORY_URL: (categoryId: string) => `${STORE_PREFIX}/categories/${categoryId}`,
  //PRODUCT_DETAILS: (productSku: string, productSlug: string) => `${STORE_PREFIX}/products/${productSku}-${productSlug}`,
};
