import { IUser } from './account.model';
import { IProduct } from './product.model';

export interface IReview {
  _id: string;
  product: IProduct;
  author: IUser;
  rating: number;
  comment: string;
  reported: boolean;
  reportReason: string | null;
  likes: number;
  dislikes: number;
  createdAt: string;
  updatedAt: string;
}
