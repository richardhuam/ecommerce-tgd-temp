import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { collections, mongooseForFeatureContainer } from '@config/mongoose';

@Module({
	imports: [mongooseForFeatureContainer([collections[0].products, collections[0].wishlist])],
	controllers: [WishlistController],
	providers: [WishlistService],
})
export class WishlistModule {}
