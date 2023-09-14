import { ACCESS_TOKEN_COOKIE_NAME, LOGGED_IN_COOKIE_NAME, LOGIN_METHOD } from '@common/constants';
import { IUser } from '@common/models';
import { encryptPwd, OkResponse, verifyPwd } from '@common/utils';
import { envConfig } from '@config/environment';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response } from 'express';
import { CreateCustomerWithGoogle, CreateUserDto, LoginUserDto } from './dto';
import { User, UserModel } from '@features/users/schema/user.schema';
import { getTokenPayload, setAccessTokenCookie, setLoggedInCookie } from '@common/utils/auth/session-manager';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Wishlist, WishlistModel } from '@features/wishlist/schema/wishlist.schema';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(User.name) private readonly userModel: UserModel,
		@InjectModel(Wishlist.name) private readonly wishlistModel: WishlistModel,
		private readonly jwtService: JwtService,
	) {}

	async login(dto: LoginUserDto, req: Request, res: Response) {
		const user: IUser = await this.userModel.findOne({ email: dto.email }).lean();
		if (!user) throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);

		if (user.loginMethod === LOGIN_METHOD.GOOGLE) throw new HttpException('INVALID_LOGIN_METHOD', HttpStatus.BAD_REQUEST);

		const passwordMatch = await verifyPwd(dto.password, user.password);
		if (!passwordMatch) throw new HttpException('INVALID_CREDENTIALS', HttpStatus.UNAUTHORIZED);

		const token = this.jwtService.sign(getTokenPayload(user));

		setAccessTokenCookie(token, req, res);
		setLoggedInCookie(user, req, res);

		return res.status(HttpStatus.OK).json(OkResponse({ token, message: 'Login Success' }));
	}

	async verifyToken() {
		return OkResponse({ message: 'Token Verified' });
	}

	async signup(dto: CreateUserDto) {
		dto.password = await encryptPwd(dto.password);
		const user = await this.userModel.create(dto);

		await this.wishlistModel.create({ owner: user._id });

		return OkResponse(user);
	}

	async getSession(req: Request, res: Response) {
		const user = req.user as IUser;

		setLoggedInCookie(user, req, res);

		return res.status(HttpStatus.OK).json(OkResponse(user));
	}

	logout(req: Request, res: Response) {
		res.clearCookie(ACCESS_TOKEN_COOKIE_NAME);
		res.clearCookie(LOGGED_IN_COOKIE_NAME);
		res.send(OkResponse('Logged out successfully'));
	}

	async validateGoogleSession(dto: CreateCustomerWithGoogle) {
		const user = await this.userModel.findOne({ email: dto.email }).lean();
		if (user) return user;
		// creating new user if does not exists
		const newUser = await this.userModel.create(dto);
		return newUser;
	}

	async googleCallback(req: Request, res: Response) {
		const user = req.user as IUser;

		const token = this.jwtService.sign(getTokenPayload(user));

		setAccessTokenCookie(token, req, res);

		if (!user) {
			res.redirect(`${envConfig().client.failureGoogleSession}`);
		}

		res.redirect(`${envConfig().client.successGoogleSession}`);
	}
}
