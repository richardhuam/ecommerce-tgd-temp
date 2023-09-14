import { IGenericState } from '@/interfaces/redux.interface';
import { ICategory } from '../category.interface';

export type ICategorySliceState = {
  getAllCategories: IGenericState<ICategory[]>;
};
