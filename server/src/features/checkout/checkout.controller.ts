import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CreateStripeSessionDto } from './dto/create-stripe-session';
import { ParamValidationPipe } from '@common/pipes/param-validation.pipe';
import { JwtAuthGuard } from '@common/guards/jwt-auth';

@UseGuards(JwtAuthGuard)
@Controller('checkout')
export class CheckoutController {
	constructor(private readonly checkoutService: CheckoutService) {}

	@Get('stripe/session/:sessionId')
	async getStripeSessionById(@Param('sessionId', ParamValidationPipe) sessionId: string) {
		return await this.checkoutService.getStripeSessionById(sessionId);
	}

	@Post('stripe/session')
	async createStripeSession(@Body() createStripeSessionDto: CreateStripeSessionDto) {
		return await this.checkoutService.createStripeSession(createStripeSessionDto);
	}
}
