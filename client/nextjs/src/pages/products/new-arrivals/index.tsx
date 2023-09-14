import { dehydrate } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import React from 'react';

import ProductNewArrivalsSection from '@/modules/products/sections/product-new-arrivals-section';
import PrimaryLayout from '@/shared/components/layouts/primary-layout';
import PageWrapper from '@/shared/components/ui/page-wrapper';
import { DEFAULT_QUERY_PAGE } from '@/shared/constants';
import { getQueryClient } from '@/shared/libs/get-query-client';
import { NextPageWithLayout } from '@/shared/models/page.model';
import { productKeys } from '@/shared/queries/product/product.query';
import { ProductService } from '@/shared/services/product/product.service';
import { getUserSessionSsr } from '@/shared/utils/auth/get-user-session-ssr';

const NewArrivalsPage: NextPageWithLayout = () => {
  return (
    <PageWrapper>
      <ProductNewArrivalsSection />
    </PageWrapper>
  );
};

NewArrivalsPage.getLayout = page => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default NewArrivalsPage;

export const getServerSideProps: GetServerSideProps = async context => {
  const queryClient = getQueryClient();
  const session = await getUserSessionSsr(context);

  const page = DEFAULT_QUERY_PAGE;
  await queryClient.prefetchQuery(productKeys.newArrivals({ page }), () => ProductService.getNewArrivals({ page }));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      session,
    },
  };
};
