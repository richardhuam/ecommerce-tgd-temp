import { Controller, Post, Body, Req, Res, UseGuards, Get, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ValidateOrderDto } from './dto/validate-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { ValidateOrderPaymentDto } from './dto/validate-order-payment';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '@common/guards/jwt-auth';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
	constructor(private readonly ordersService: OrdersService) {}

	@Get()
	async getOrders(@Query('page') page: string, @Query('limit') limit: string, @Req() req: Request, @Res() res: Response) {
		return await this.ordersService.getOrders({ req, res, page, limit });
	}

	@Post()
	async createOrder(@Body() createOrderDto: CreateOrderDto) {
		return await this.ordersService.createOrder(createOrderDto);
	}

	@Post('validate-order')
	async validateOrder(@Body() validateOrderDto: ValidateOrderDto) {
		return await this.ordersService.validateOrder(validateOrderDto);
	}

	@Post('validate-order-payment-status')
	async validateOrderPayment(@Body() validateOrderPaymentDto: ValidateOrderPaymentDto, @Req() req: Request, @Res() res: Response) {
		return await this.ordersService.validateOrderPayment(validateOrderPaymentDto, req, res);
	}
}
