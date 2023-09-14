import { LOGIN_METHOD } from '@common/constants';
import { envConfig } from '@config/environment';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import { CreateCustomerWithGoogle } from '../dto';
import { User, UserModel } from '@features/users/schema/user.schema';

export class GoogleStrategy extends PassportStrategy(Strategy) {
	constructor(@InjectModel(User.name) private readonly userModel: UserModel) {
		super({
			clientID: envConfig().google.clientId,
			clientSecret: envConfig().google.clientSecret,
			callbackURL: envConfig().google.callbackUrl,
			scope: ['email', 'profile'],
		});
	}

	async validate(accesToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
		const payload: CreateCustomerWithGoogle = {
			firstName: profile.name.givenName,
			lastName: profile.name.familyName,
			email: profile.emails[0].value,
			avatar: profile._json.picture,
			loginMethod: LOGIN_METHOD.GOOGLE,
		};

		try {
			const sessionResolver = async (payload: CreateCustomerWithGoogle) => {
				const { lastName, ...rest } = payload;
				const user = await this.userModel.findOne({ email: payload.email }).lean();
				if (user) return { isNewUser: false, ...user };
				return await this.userModel.create(!lastName ? rest : payload);
			};

			const user = sessionResolver(payload);
			if (user) done(null, user);
		} catch (error) {
			done(null, null);
		}
	}
}
