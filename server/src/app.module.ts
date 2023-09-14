import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EnvironmentConfigModule } from '@config/environment';
import { FeaturesModule } from '@features/features.module';
import { MongooseForRootConfigModule } from '@config/mongoose';
import { CoreModule } from './core/core.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './core/all-exceptions.filter';

@Module({
	imports: [CoreModule, EnvironmentConfigModule, MongooseForRootConfigModule, FeaturesModule],
	controllers: [AppController],
	providers: [{ provide: APP_FILTER, useClass: AllExceptionsFilter }],
})
export class AppModule {}
