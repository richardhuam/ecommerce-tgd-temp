import Alert from '@/shared/components/ui/alert';
import { IProductCategory } from '@/shared/models/product.model';
import { useGetAllCategories } from '@/shared/queries/category/category.query';

import ProductCategoryGrid from '../components/product-category-grid';
import ProductCategoryGridSkeleton from '../components/product-category-grid-skeleton';

interface ProductCategorySectionProps {
  categoryChunk: IProductCategory[];
}

export default function ProductCategorySection({ categoryChunk }: ProductCategorySectionProps) {
  const { isLoading, error, refetch } = useGetAllCategories();

  let content;

  if (isLoading) {
    content = <ProductCategoryGridSkeleton />;
  } else if (error) {
    content = (
      <Alert
        callToAction={{ label: 'Retry', action: () => refetch() }}
        variant="error"
        title="Oops, something went wrong"
        message="Failed to load product categories. Please try again later"
      />
    );
  } else {
    content = <ProductCategoryGrid productCategoryData={categoryChunk} />;
  }

  return <section className="main-container flex items-center justify-center">{content}</section>;
}
