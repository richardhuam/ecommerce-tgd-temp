import { dehydrate } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';

import { routes } from '@/config/routes';
import SecurePaymentGrid from '@/modules/home/components/secure-payment-grid';
import ProductMainSection from '@/modules/home/sections/product-main-section';
import HeroCarousel from '@/shared/components/hero/hero-carousel/hero-carousel';
import PrimaryLayout from '@/shared/components/layouts/primary-layout';
import Seo from '@/shared/components/seo/seo';
import PageWrapper from '@/shared/components/ui/page-wrapper';
import { getQueryClient } from '@/shared/libs/get-query-client';
import { NextPageWithLayout } from '@/shared/models/page.model';
import { categoryKeys } from '@/shared/queries/category/category.query';
import { productKeys } from '@/shared/queries/product/product.query';
import { CategoryService } from '@/shared/services/category/category.service';
import { ProductService } from '@/shared/services/product/product.service';
import { getUserSessionSsr } from '@/shared/utils/auth/get-user-session-ssr';

const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <Seo
        title="Ecommerce this is a title example"
        description="Fastest digital ecommerce built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path={routes.home}
      />
      <HeroCarousel />
      <PageWrapper container={false}>
        <SecurePaymentGrid />
        <ProductMainSection />
      </PageWrapper>
    </>
  );
};
HomePage.getLayout = page => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async context => {
  const queryClient = getQueryClient();

  const session = await getUserSessionSsr(context);

  await Promise.all([
    queryClient.prefetchQuery(productKeys.limitedBestSellers(), ProductService.getLimitedBestSellers),
    queryClient.prefetchQuery(productKeys.limitedNewArrivals(), ProductService.getLimitedNewArrivals),
    queryClient.prefetchQuery(productKeys.limitedTrendingProducts(), ProductService.getLimitedTrendingProducts),
    queryClient.prefetchQuery(categoryKeys.categories(), CategoryService.getAllCategories),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      session,
    },
  };
};
