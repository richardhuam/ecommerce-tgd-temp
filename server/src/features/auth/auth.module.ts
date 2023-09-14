import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/local.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { collections, mongooseForFeatureContainer } from '@config/mongoose';

@Module({
	imports: [mongooseForFeatureContainer([collections[0].users, collections[0].wishlist])],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, GoogleStrategy],
})
export class AuthModule {}
