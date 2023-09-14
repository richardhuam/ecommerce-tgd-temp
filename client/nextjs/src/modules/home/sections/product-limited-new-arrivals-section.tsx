import React from 'react';

import { routes } from '@/config/routes';
import ProductCardSkeleton from '@/shared/components/products/product-card-skeleton';
import ProductCarousel from '@/shared/components/products/product-carousel';
import ProductSectionContainer from '@/shared/components/products/product-section-container';
import Alert from '@/shared/components/ui/alert';
import { useCore } from '@/shared/contexts/core.context';
import { useGetLimitedNewArrivals } from '@/shared/queries/product/product.query';

const ProductLimitedNewArrivalsSection = () => {
  const { data, error, isLoading, refetch } = useGetLimitedNewArrivals();
  const { isFakeDelayLoading } = useCore();

  const { data: productNewArrivalsData = [] } = data ?? {};

  let content;

  if (isLoading || !isFakeDelayLoading) {
    content = <ProductCardSkeleton qty={5} />;
  } else if (error) {
    content = (
      <Alert
        callToAction={{ label: 'Retry', action: () => refetch() }}
        variant="error"
        title="Oops, something went wrong"
        message="Failed to load new arrivals. Please try again later."
      />
    );
  } else if (productNewArrivalsData.length === 0) {
    content = <Alert variant="info" title="No products to display" message="Seems like there are not products registered" />;
  } else {
    content = <ProductCarousel productSlideData={productNewArrivalsData} />;
  }

  return (
    <ProductSectionContainer title="New Arrivals" url={routes.newArrivals}>
      {content}
    </ProductSectionContainer>
  );
};

export default ProductLimitedNewArrivalsSection;
