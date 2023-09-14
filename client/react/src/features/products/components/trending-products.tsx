import { useAppDispatch, useAppSelector } from '@/hooks/use-redux-store';
import { useEffect } from 'react';
import { ProductThunk } from '../redux/product.thunk';
import ProductCardSkeleton from './product-card/product-card-skeleton';
import Alert from '@/features/ui/alert';
import ProductCardGroup from './product-card/product-card-group';

export default function TrendingProducts() {
  const dispatch = useAppDispatch();
  const {
    data: limitedTrendingProducts,
    error,
    status,
  } = useAppSelector(store => store.product.getLimitedTrendingProducts);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(ProductThunk.getLimitedTrendingProducts());
    }
  }, [dispatch, status]);

  if (status === 'loading') return <ProductCardSkeleton />;

  if (error) return <Alert type="error" message="Something went wrong, please try again later" />;

  return <ProductCardGroup title="Trending" productData={limitedTrendingProducts} />;
}
