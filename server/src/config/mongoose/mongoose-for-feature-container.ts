/* eslint-disable @typescript-eslint/ban-types */
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';

export const mongooseForFeatureContainer = (collections: ModelDefinition[]) => MongooseModule.forFeature(collections);
