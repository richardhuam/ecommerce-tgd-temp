import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { JwtDataModel } from '@common/models';
import { envConfig } from '@config/environment';
import { InjectModel } from '@nestjs/mongoose';
import { getCookiesAsCollection } from '@common/utils';
import { User, UserModel } from '@features/users/schema/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(@InjectModel(User.name) private readonly userModel: UserModel) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWT]),
			ignoreExpiration: false,
			secretOrKey: envConfig().jwt.secret,
		});
	}

	public static extractJWT(req: Request) {
		const cookies = req.headers.cookie as string;

		const cookie = getCookiesAsCollection(cookies) as {
			access_token: string;
		};

		if (!cookie.access_token) return null;
		return cookie.access_token;
	}

	async validate(payload: JwtDataModel | null) {
		if (payload) {
			return await this.userModel.findById(payload.id);
		}
		return payload;
	}
}
