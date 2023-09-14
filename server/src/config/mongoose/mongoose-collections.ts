import { Category, CategorySchema } from '@features/categories/schema/category.schema';
import { Coupon, CouponSchema } from '@features/coupons/schema/coupon.schema';
import { Order, OrderSchema } from '@features/orders/schema/order.schema';
import { Product, ProductSchema } from '@features/products/schema/product.schema';
import { Review, ReviewSchema } from '@features/reviews/schema/review.schema';
import { ShippingCost } from '@features/shipping-costs/entities/shipping-cost.entity';
import { ShippingCostSchema } from '@features/shipping-costs/schema/shipping-cost.schema';
import { User, UserSchema } from '@features/users/schema/user.schema';
import { Wishlist, WishlistSchema } from '@features/wishlist/schema/wishlist.schema';

export const collections = [
	{
		users: {
			name: User.name,
			schema: UserSchema,
		},
		products: {
			name: Product.name,
			schema: ProductSchema,
		},
		categories: {
			name: Category.name,
			schema: CategorySchema,
		},
		reviews: {
			name: Review.name,
			schema: ReviewSchema,
		},
		wishlist: {
			name: Wishlist.name,
			schema: WishlistSchema,
		},
		coupons: {
			name: Coupon.name,
			schema: CouponSchema,
		},
		shippingCost: {
			name: ShippingCost.name,
			schema: ShippingCostSchema,
		},
		orders: {
			name: Order.name,
			schema: OrderSchema,
		},
	},
];
