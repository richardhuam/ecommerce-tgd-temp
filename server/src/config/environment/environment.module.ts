import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from './env.config';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ['.env.development' /* , '.env.production' */],
			load: [envConfig],
		}),
	],
})
export class EnvironmentConfigModule {}
