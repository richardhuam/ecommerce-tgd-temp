import { envConfig } from '@config/environment';
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
	imports: [
		JwtModule.registerAsync({
			useFactory: () => ({
				signOptions: { expiresIn: envConfig().jwt.expiration },
				secret: envConfig().jwt.secret,
			}),
		}),
	],
	exports: [JwtModule],
})
export class CoreModule {}
