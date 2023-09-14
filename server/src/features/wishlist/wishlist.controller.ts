import { Controller, Get, Param, UseGuards, Put, Req, Res, Query, Post } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { JwtAuthGuard } from '@common/guards/jwt-auth';
import { ObjectIdValidationPipe } from '@common/pipes/object-id-validation.pipe';
import { Request, Response } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('wishlist')
export class WishlistController {
	constructor(private readonly wishlistService: WishlistService) {}

	@Get()
	async getAllWishlistItems(@Query('page') page: string, @Query('limit') limit: string, @Req() req: Request, @Res() res: Response) {
		return await this.wishlistService.getAllWishlistItems({ req, res, page, limit });
	}

	@Put(':productId')
	async toggleWishlistItem(@Param('productId', ObjectIdValidationPipe) productId: string, @Req() req: Request, @Res() res: Response) {
		return await this.wishlistService.toggleWishlistItem({ req, res, productId });
	}
}
