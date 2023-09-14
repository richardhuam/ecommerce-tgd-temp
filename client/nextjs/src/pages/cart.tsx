import { dehydrate } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import React from 'react';

import { routes } from '@/config/routes';
import CartSection from '@/modules/cart/sections/cart-section';
import PrimaryLayout from '@/shared/components/layouts/primary-layout';
import Seo from '@/shared/components/seo/seo';
import Breadcrumb from '@/shared/components/ui/breadcrumb';
import PageWrapper from '@/shared/components/ui/page-wrapper';
import { getQueryClient } from '@/shared/libs/get-query-client';
import { NextPageWithLayout } from '@/shared/models/page.model';
import { getUserSessionSsr } from '@/shared/utils/auth/get-user-session-ssr';

const CartPage: NextPageWithLayout = () => {
  return (
    <>
      <Seo title="Cart title" description="Cart description. this is something bla bla bla" path={routes.orders} />
      <PageWrapper>
        <Breadcrumb title="Shopping Cart" />
        <CartSection />
      </PageWrapper>
    </>
  );
};

CartPage.getLayout = page => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default CartPage;

export const getServerSideProps: GetServerSideProps = async context => {
  const queryClient = getQueryClient();

  const session = await getUserSessionSsr(context);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      session,
    },
  };
};
