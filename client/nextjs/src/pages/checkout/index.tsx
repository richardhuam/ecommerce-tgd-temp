import { dehydrate } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import React from 'react';

import { routes } from '@/config/routes';
import CheckoutSection from '@/modules/checkout/sections/checkout-section';
import PrimaryLayout from '@/shared/components/layouts/primary-layout';
import Seo from '@/shared/components/seo/seo';
import Breadcrumb from '@/shared/components/ui/breadcrumb';
import PageWrapper from '@/shared/components/ui/page-wrapper';
import { CheckoutProvider } from '@/shared/contexts/checkout.context';
import { getQueryClient } from '@/shared/libs/get-query-client';
import { NextPageWithLayout } from '@/shared/models/page.model';
import { shippingCostKeys } from '@/shared/queries/shipping-cost/shipping-cost.query';
import { ShippingCostService } from '@/shared/services/shipping-cost/shipping-cost.service';
import { authenticationSsr } from '@/shared/utils/auth/authentication-handler-ssr';
import { getUserSessionSsr } from '@/shared/utils/auth/get-user-session-ssr';

const CheckoutPage: NextPageWithLayout = () => {
  return (
    <CheckoutProvider>
      <Seo title="Checkout title" description="Checkout description. this is something bla bla bla" path={routes.orders} />
      <PageWrapper>
        <Breadcrumb title="Checkout Details" />
        <CheckoutSection />
      </PageWrapper>
    </CheckoutProvider>
  );
};

CheckoutPage.getLayout = page => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default CheckoutPage;

export const getServerSideProps: GetServerSideProps = async context => {
  const queryClient = getQueryClient();

  const session = await getUserSessionSsr(context);

  await queryClient.prefetchQuery(shippingCostKeys.getAllShippingCosts(), ShippingCostService.getShippingCosts);

  return {
    ...authenticationSsr({
      context,
      isAuthenticated: session.isAuthenticated,
      redirectionFailPath: routes.login,
      requireAuthentication: true,
    }),
    props: {
      dehydratedState: dehydrate(queryClient),
      session,
    },
  };
};
