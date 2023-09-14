import mongoose from 'mongoose';
import { IUser } from './user.model';
import { IProductPopulated } from './product-model';

export interface IWishlist {
	owner: mongoose.Schema.Types.ObjectId;
	products: mongoose.Schema.Types.ObjectId[];
}

export interface IWishlistPopulated {
	_id: mongoose.Schema.Types.ObjectId;
	owner: IUser;
	products: IProductPopulated[];
	createdAt: string;
	updatedAt: string;
}
