import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UniqueEmailConstraint } from '@common/constraints';
import { collections, mongooseForFeatureContainer } from '@config/mongoose';

@Module({
	imports: [mongooseForFeatureContainer([collections[0].users, collections[0].products])],
	controllers: [UsersController],
	providers: [UsersService, UniqueEmailConstraint],
})
export class UsersModule {}
