import { useAppDispatch, useAppSelector } from '@/hooks/use-redux-store';
import { useEffect } from 'react';
import { ProductThunk } from '../redux/product.thunk';
import ProductCardSkeleton from './product-card/product-card-skeleton';
import Alert from '@/features/ui/alert';
import ProductCardGroup from './product-card/product-card-group';

export default function NewArrivals() {
  const dispatch = useAppDispatch();
  const { data: limitedNewArrivals, error, status } = useAppSelector(store => store.product.getLimitedNewArrivals);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(ProductThunk.getLimitedNewArrivals());
    }
  }, [dispatch, status]);

  if (status === 'loading') return <ProductCardSkeleton />;

  if (error) return <Alert type="error" message="Something went wrong, please try again later" />;

  return <ProductCardGroup title="New Arrivals" productData={limitedNewArrivals} />;
}
