import { useAppDispatch, useAppSelector } from '@/hooks/use-redux-store';
import { useEffect } from 'react';
import { ProductThunk } from '../redux/product.thunk';
import ProductCardGroup from './product-card/product-card-group';
import ProductCardSkeleton from './product-card/product-card-skeleton';
import Alert from '../../ui/alert';

export default function BestSellers() {
  const dispatch = useAppDispatch();
  const { data: limitedBestSellers, error, status } = useAppSelector(store => store.product.getLimitedBestSellers);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(ProductThunk.getLimitedBestSellers());
    }
  }, [dispatch, status]);

  if (status === 'loading') return <ProductCardSkeleton />;

  if (error) return <Alert type="error" message="Something went wrong, please try again later" />;

  return <ProductCardGroup title="Best Sellers" productData={limitedBestSellers} />;
}
