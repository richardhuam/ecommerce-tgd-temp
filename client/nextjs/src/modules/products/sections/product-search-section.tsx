import ProductSearchLayout from '@/shared/components/layouts/product-search-layout/product-search-layout';
import { useProduct } from '@/shared/contexts/product.context';
import { useSearchProducts } from '@/shared/queries/product/product.query';

import ProductNotFoundCard from '../components/product-not-found-card';

export default function ProductSearchSection() {
  const { productSearch } = useProduct();
  const products = useSearchProducts({ keyWord: productSearch.keyWord, page: productSearch.page });

  if ((products.data?.data.result ?? []).length < 1 && !products.isLoading) return <ProductNotFoundCard />;

  return <ProductSearchLayout products={products} />;
}
