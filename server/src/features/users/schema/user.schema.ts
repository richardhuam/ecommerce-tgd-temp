import { COLLECTION_NAMES, LOGIN_METHOD, ROLES, USER_STATUS } from '@common/constants';
import { UserAddressModel } from '@common/models';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Model } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
export type UserModel = Model<UserDocument>;

@Schema({
	timestamps: true,
	collection: COLLECTION_NAMES.USER,
})
export class User {
	@Prop({ required: true, unique: true })
	email: string;

	@Prop({ required: true })
	password: string;

	@Prop({ required: true })
	firstName: string;

	@Prop({ required: false })
	lastName: string;

	@Prop({ required: false })
	phone: string;

	@Prop({ required: false })
	avatar: string;

	@Prop({ required: false, type: mongoose.Schema.Types.Mixed })
	address: UserAddressModel;

	@Prop({
		required: true,
		enum: [LOGIN_METHOD.EMAIL, LOGIN_METHOD.FACEBOOK, LOGIN_METHOD.GOOGLE],
		default: LOGIN_METHOD.EMAIL,
	})
	loginMethod: LOGIN_METHOD;

	@Prop({ required: true, type: Boolean, default: false })
	emailVerified: boolean;

	@Prop({ required: false })
	dateOfBirth: Date;

	@Prop({
		type: String,
		required: true,
		enum: [ROLES.ADMIN, ROLES.USER],
		default: ROLES.USER,
	})
	role: ROLES;

	@Prop({
		type: String,
		required: true,
		enum: [USER_STATUS.ACTIVE, USER_STATUS.DISABLED, USER_STATUS.RESTRICTED],
		default: USER_STATUS.ACTIVE,
	})
	status: USER_STATUS;
}

export const UserSchema = SchemaFactory.createForClass(User);
