import ProductCategoryCard from '@/shared/components/products/product-category-card';
import { IProductCategory } from '@/shared/models/product.model';

type ProductCategoryGridProps = {
  productCategoryData: IProductCategory[];
};

export default function ProductCategoryGrid({ productCategoryData = [] }: ProductCategoryGridProps) {
  return (
    <div className="w-full">
      <div className="grid-cols-1 grid gap-3 lg:gap-3 md:gap-4 2xl:gap-5 lg:grid-cols-3 xl:grid-cols-3">
        {productCategoryData.map(cat => (
          <ProductCategoryCard key={cat._id} {...cat} />
        ))}
      </div>
    </div>
  );
}
