export enum ROLES {
  VENDOR = 'Vendor',
  ADMIN = 'Admin',
  USER = 'User',
}

export enum USER_STATUS {
  ACTIVE = 'Active',
  RESTRICTED = 'Restricted',
  DISABLED = 'Disabled',
}

export enum LOGIN_METHOD {
  EMAIL = 'Email',
  GOOGLE = 'Google',
  FACEBOOK = 'Facebook',
}

export enum STATUS {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}

export const PRODUCT_STOCK_ALERT = 20;
export const PRODUCT_SHIPPING_COST = 20;
export const PRODUCT_FREE_SHIPPING_COST_LIMIT = 600;
export const PRODUCT_TAX_PERCENT = 8;

export enum PRICE_CURRENCY {
  USD = 'USD',
  PEN = 'PEN',
}

//export const DEFAULT_QUERY_LIMIT = 8;
export const DEFAULT_QUERY_PAGE = 1;

export enum DISCOUNT_TYPE {
  PERCENTAGE = 'percentage',
  FIXED = 'fixed',
}

export enum SHIPPING_METHODS {
  STANDARD = 'standard',
  EXPRESS = 'express',
}

export enum ORDER_STATUS {
  ORDER_PLACED = 'Order Placed',
  ORDER_PROCESSING = 'Order Processing',
  ORDER_CONFIRMED = 'Order Confirmed',
  ORDER_SHIPPED = 'Order Shipped',
  IN_TRANSIT = 'In Transit',
  OUT_FOR_DELIVERY = 'Out for Delivery',
  DELIVERED = 'Delivered',
  PENDING_PAYMENT = 'Pending Payment',
  CANCELLED = 'Cancelled',
  RETURNED = 'Returned',
  REFUNDED = 'Refunded',
}

export enum ORDER_PAYMENT_METHOD {
  STRIPE = 'Stripe',
  DEBIT_OR_CREDIT_CARD = 'Debit or Credit card',
}

export enum COUPON_STATUS {
  APPLIED = 'Coupon Applied',
  NOT_APPLIED = 'No Coupon Applied',
  INCORRECT_COUPON = 'Incorrect Coupon Code',
  MIN_AMOUNT_ERROR = 'Min amount error',
  IS_INACTIVE = 'Coupon is inactive',
  EXPIRED = 'Coupon Expired',
  NOT_APPLICABLE = 'Not Applicable',
}

export enum DISCOUNT_METHODS {
  COUPON = 'Coupon',
}
