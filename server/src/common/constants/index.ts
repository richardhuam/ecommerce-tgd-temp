export const ACCESS_TOKEN_COOKIE_NAME = 'access_token';
export const LOGGED_IN_COOKIE_NAME = 'logged_in';

export enum ROLE_KEY {
	USER = 'User',
	CUSTOMER = 'Customer',
}

export enum ROLES {
	ADMIN = 'Admin',
	USER = 'User',
}

export enum STATUS {
	ACTIVE = 'Active',
	INACTIVE = 'Inactive',
}

export enum USER_TYPE {
	CUSTOMER = 'Customer',
	USER = 'User',
	/* 	VENDOR = 'Vendor',
	CUSTOMER = 'Customer',
	STAFF = 'Staff', */
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

export enum VENDOR_AUTHORIZATION_STATUS {
	REJECTED = 'Rejected',
	PENDING = 'Pending',
	APPROVED = 'Approved',
}

export enum DISCOUNT_TYPE {
	PERCENTAGE = 'percentage',
	FIXED = 'fixed',
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

export enum COLLECTION_NAMES {
	USER = 'users',
	PRODUCT = 'products',
	CATEGORY = 'categories',
	COUPON = 'coupons',
	REVIEW = 'reviews',
	WISHLIST = 'wishlist',
	ORDER = 'orders',
	SHIPPING_COST = 'shipping-costs',
}

export enum IPRICE_CURRENCY {
	USD = 'USD',
	PEN = 'PEN',
}

export enum SHIPPING_METHOD {
	STANDARD = 'standard',
	EXPRESS = 'express',
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

export const PRODUCT_FREE_SHIPPING_COST_LIMIT = 60000; // 600 dollars
export const PRODUCT_DISCOUNT_PRICE_LIMIT = 20000; // 200 dollars
//export const PRODUCT_TAX_PERCENT = 8;
export const PRODUCT_TAX_PERCENT = 0;

export enum PAYMENT_STATUS {
	NOT_PAID = 'Not Paid',
	PAID = 'Paid',
	REFUNDED = 'Refunded',
}
