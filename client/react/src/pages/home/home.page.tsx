import SecurePaymentGrid from '@/features/payments/components/secure-payment-grid/secure-payment-grid';
import Container from '@/features/layouts/container';
import CategoryRowList from '@/features/categories/components/category-row-list';
import BestSellers from '@/features/products/components/best-sellers';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux-store';
import { splitArray } from '@/utils/split-array.utils';
import { useEffect } from 'react';
import { CategoryThunk } from '@/features/categories/redux/category.thunk';
import NewArrivals from '@/features/products/components/new-arrivals';
import TrendingProducts from '@/features/products/components/trending-products';
import HeroCarousel from '@/features/hero/components/hero-carousel/hero-carousel';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(store => store.category.getAllCategories);

  useEffect(() => {
    if (categories.status === 'idle') dispatch(CategoryThunk.getAllCategories());
  }, [dispatch, categories.status]);

  return (
    <>
      <HeroCarousel />
      <Container className="section-spacer">
        <SecurePaymentGrid />
        <CategoryRowList categoryData={splitArray(categories.data, 3)[0]} />
        <NewArrivals />
        <BestSellers />
        <CategoryRowList categoryData={splitArray(categories.data, 3)[1]} />
        <TrendingProducts />
      </Container>
    </>
  );
}
