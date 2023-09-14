import CategoryCard from './category-card';
import { ICategory } from '../../category.interface';

type CategoryGridProps = {
  categoryData: ICategory[];
};

export default function CategoryCardGrid({ categoryData }: CategoryGridProps) {
  return (
    <div className="w-full">
      <div className="grid-cols-1 grid gap-3 lg:gap-3 md:gap-4 2xl:gap-5 lg:grid-cols-3 xl:grid-cols-3">
        {categoryData.map(cat => (
          <CategoryCard key={cat._id} {...cat} />
        ))}
      </div>
    </div>
  );
}
