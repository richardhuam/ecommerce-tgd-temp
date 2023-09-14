import { envConfig } from '@config/environment';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [MongooseModule.forRoot(envConfig().db.uri)],
})
export class MongooseForRootConfigModule {}
