import { DISCOUNT_TYPE } from '../constants';
import { IUser } from './account.model';

export type ICoupon = {
  _id: string;
  code: string;
  discountType: DISCOUNT_TYPE;
  discountValue: number;
  maxUses: number;
  usedCount: number;
  usedByUsers: IUser[];
  isSingleUse: boolean;
  minOrderAmount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};
