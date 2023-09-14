import { Body, Controller, Get, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { JwtAuthGuard } from '@common/guards/jwt-auth';
import { Request, Response } from 'express';

@Controller('reviews')
export class ReviewsController {
	constructor(private readonly reviewsService: ReviewsService) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	async createReview(@Body() createReviewDto: CreateReviewDto, @Req() req: Request, @Res() res: Response) {
		return await this.reviewsService.createReview(createReviewDto, req, res);
	}

	@UseGuards(JwtAuthGuard)
	@Get('pending')
	async getPendingReviews(@Req() req: Request, @Res() res: Response, @Query('page') page: string, @Query('limit') limit: string) {
		return await this.reviewsService.getPendingReviews(req, res, page, limit);
	}

	@UseGuards(JwtAuthGuard)
	@Get('pending-as-collection')
	async getPendingReviewsAsCollection(@Req() req: Request, @Res() res: Response) {
		return await this.reviewsService.getPendingReviewsAsCollection(req, res);
	}

	@UseGuards(JwtAuthGuard)
	@Get('completed')
	async getCompletedReviews(@Req() req: Request, @Res() res: Response, @Query('page') page: string, @Query('limit') limit: string) {
		return await this.reviewsService.getCompletedReviews(req, res, page, limit);
	}

	@Get()
	async getReviewsFromProductId(@Query('productSku') productSku: string, @Query('page') page: string, @Query('limit') limit: string) {
		return await this.reviewsService.getReviewsFromProductSku({ productSku, page, limit });
	}
}
