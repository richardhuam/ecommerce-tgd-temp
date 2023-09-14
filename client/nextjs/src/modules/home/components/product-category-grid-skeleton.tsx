import ProductCategoryCardSkeleton from '@/shared/components/products/product-category-card-skeleton';

export default function ProductCategoryGridSkeleton() {
  return (
    <div className="w-full">
      <div className="grid-cols-1 grid gap-3 lg:gap-3 md:gap-4 2xl:gap-5 lg:grid-cols-3 xl:grid-cols-3">
        <ProductCategoryCardSkeleton />
      </div>
    </div>
  );
}
