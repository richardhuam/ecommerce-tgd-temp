import { useAppSelector } from '@/hooks/use-redux-store';
import CategoryCardSkeleton from './category-card/category-card-skeleton';
import { ICategory } from '../category.interface';
import CategoryCardGrid from './category-card/category-card-grid';
import Alert from '../../ui/alert';

type CategoryRowListProps = {
  categoryData: ICategory[];
};

export default function CategoryRowList({ categoryData }: CategoryRowListProps) {
  const { error, status } = useAppSelector(store => store.category.getAllCategories);

  if (status === 'loading') return <CategoryCardSkeleton />;

  if (error) return <Alert type="error" message="Something went wrong, please try again later" />;

  if (categoryData && categoryData.length >= 1) {
    return <CategoryCardGrid categoryData={categoryData} />;
  }

  return null;
}
