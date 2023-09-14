/* eslint-disable @typescript-eslint/no-empty-function */
import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtAuthGuard } from '@common/guards/jwt-auth';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	public async login(@Body() dto: LoginUserDto, @Req() req: Request, @Res() res: Response) {
		return await this.authService.login(dto, req, res);
	}

	@UseGuards(JwtAuthGuard)
	@Post('verify-token')
	public async verifyToken() {
		return await this.authService.verifyToken();
	}

	@Post('signup')
	public async signup(@Body() dto: CreateUserDto) {
		return await this.authService.signup(dto);
	}

	@UseGuards(JwtAuthGuard)
	@Get('session')
	public async getSession(@Req() req: Request, @Res() res: Response) {
		return await this.authService.getSession(req, res);
	}

	@Post('logout')
	public logout(@Req() req: Request, @Res() res: Response) {
		return this.authService.logout(req, res);
	}
}

/* 	@Get('google/login')
	@UseGuards(GoogleAuthGuard)
	async googleAuth() {}

	@Get('google/callback')
	@UseGuards(GoogleAuthGuard)
	public async handleCallback(@Req() req: Request, @Res() res: Response) {
		return await this.authService.googleCallback(req, res);

	} */
