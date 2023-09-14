import mongoose from 'mongoose';
import { IUser } from './user.model';
import { IProductPopulated } from './product-model';

export interface IReview {
	author: mongoose.Schema.Types.ObjectId;
	rating: number;
	comment: string;
	product: string;
}

export interface IReviewPopulated extends Pick<IReview, 'rating' | 'comment'> {
	author: IUser;
	product: IProductPopulated;
}
