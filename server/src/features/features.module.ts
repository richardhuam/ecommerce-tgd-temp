import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UsersModule } from './users/users.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { OrdersModule } from './orders/orders.module';
import { CouponsModule } from './coupons/coupons.module';
import { ShippingCostsModule } from './shipping-costs/shipping-costs.module';
import { CheckoutModule } from './checkout/checkout.module';

@Module({
	imports: [
		AuthModule,
		ProductsModule,
		UsersModule,
		CategoriesModule,
		ReviewsModule,
		WishlistModule,
		OrdersModule,
		CouponsModule,
		ShippingCostsModule,
		CheckoutModule,
	],
})
export class FeaturesModule {}
