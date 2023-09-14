import { routes } from '@/config/routes';
import ProductCardSkeleton from '@/shared/components/products/product-card-skeleton';
import ProductCarousel from '@/shared/components/products/product-carousel';
import ProductSectionContainerWitBackground from '@/shared/components/products/product-section-container-with-background';
import Alert from '@/shared/components/ui/alert';
import { useCore } from '@/shared/contexts/core.context';
import { useGetLimitedTrendingProducts } from '@/shared/queries/product/product.query';

const ProductLimitedTrendingSection = () => {
  const { data, error, isLoading, refetch } = useGetLimitedTrendingProducts();
  const { isFakeDelayLoading } = useCore();

  const { data: productTrendingData = [] } = data ?? {};

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
  } else if (productTrendingData.length === 0) {
    content = <Alert variant="info" title="No products to display" message="Seems like there are not products registered" />;
  } else {
    content = <ProductCarousel productSlideData={productTrendingData} />;
  }

  return (
    <ProductSectionContainerWitBackground
      title="Discover some of the trending products!"
      description="Get inspired and be part of #Ecommerce 😎"
      url={routes.trendingProducts}
    >
      {content}
    </ProductSectionContainerWitBackground>
  );
};

export default ProductLimitedTrendingSection;
