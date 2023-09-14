import { Controller, Get, Post, Body, Patch, Param, Query, Req, Res, UseGuards } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { ParamValidationPipe } from '@common/pipes/param-validation.pipe';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '@common/guards/jwt-auth';
import { ParamToUppercaseValidationPipe } from '@common/pipes/param-to-uppercase-validation.pipe';

@UseGuards(JwtAuthGuard)
@Controller('coupons')
export class CouponsController {
	constructor(private readonly couponsService: CouponsService) {}

	@Get()
	async getAllCoupons(@Query('page') page: string, @Query('limit') limit: string) {
		return await this.couponsService.getAllCoupons({ page, limit });
	}

	@Post()
	async createCoupon(@Body() createCouponDto: CreateCouponDto) {
		return await this.couponsService.createCoupon(createCouponDto);
	}

	@Patch(':code')
	async applyCoupon(@Param('code', ParamValidationPipe) couponCode: string, @Req() req: Request, @Res() res: Response) {
		return await this.couponsService.applyCoupon({ couponCode, req, res });
	}

	@Post(':code')
	async getCouponByCode(@Param('code', ParamToUppercaseValidationPipe) couponCode: string) {
		return await this.couponsService.getCouponByCode(couponCode);
	}
}
