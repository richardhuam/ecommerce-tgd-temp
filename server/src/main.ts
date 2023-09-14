import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { json } from 'express';
import { envConfig } from '@config/environment';
import { corsOptions } from '@config/cors';

import * as morgan from 'morgan';
import { getLogStream } from '@common/utils/loggers';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.enable('trust proxy');
	app.enableCors({ ...corsOptions });
	useContainer(app.select(AppModule), { fallbackOnErrors: true });
	// Change the payload size of every request (from 2mb to 60mb)
	app.use(json({ limit: '60mb' }));

	app.useGlobalPipes(new ValidationPipe());
	// Set global prefix to base url -> http://example.com/api
	app.setGlobalPrefix('api');
	app.use(morgan('combined', { stream: getLogStream() }));
	app.use(cookieParser());
	//app.set('trust proxy', true);
	await app.listen(envConfig().app.port);
}
bootstrap();
