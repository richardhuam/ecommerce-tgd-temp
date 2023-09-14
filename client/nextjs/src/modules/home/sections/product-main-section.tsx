import { useGetAllCategories } from '@/shared/queries/category/category.query';
import { splitArray } from '@/shared/utils/split-array';

import ProductCategorySection from './product-category-section';
import ProductLimitedBestSellersSection from './product-limited-best-sellers-section';
import ProductLimitedNewArrivalsSection from './product-limited-new-arrivals-section';
import ProductLimitedTrendingSection from './product-limited-trending-section';

export default function ProductMainSection() {
  const { data: categories } = useGetAllCategories();

  const allCategories = categories?.data ?? [];

  const productCategoryChunk = splitArray(allCategories, 3);

  const hasValidCategory1 = productCategoryChunk[0]?.length >= 1;
  const hasValidCategory2 = productCategoryChunk[1]?.length >= 1;
  const hasValidCategory3 = productCategoryChunk[2]?.length >= 1;

  return (
    <>
      {hasValidCategory1 && <ProductCategorySection categoryChunk={productCategoryChunk[0]} />}
      <ProductLimitedBestSellersSection />
      <ProductLimitedNewArrivalsSection />
      {hasValidCategory2 && <ProductCategorySection categoryChunk={productCategoryChunk[1]} />}
      <ProductLimitedTrendingSection />
      {hasValidCategory3 && <ProductCategorySection categoryChunk={productCategoryChunk[2]} />}
    </>
  );
}
