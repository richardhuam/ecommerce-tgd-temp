import { dehydrate } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import React from 'react';

import { routes } from '@/config/routes';
import PrimaryLayout from '@/shared/components/layouts/primary-layout';
import Seo from '@/shared/components/seo/seo';
import Breadcrumb from '@/shared/components/ui/breadcrumb';
import PageWrapper from '@/shared/components/ui/page-wrapper';
import { getQueryClient } from '@/shared/libs/get-query-client';
import { NextPageWithLayout } from '@/shared/models/page.model';
import { authenticationSsr } from '@/shared/utils/auth/authentication-handler-ssr';
import { getUserSessionSsr } from '@/shared/utils/auth/get-user-session-ssr';

const OrderTrackingNumberPage: NextPageWithLayout = () => {
  return (
    <>
      <Seo
        title="Order title"
        description="Order Tracking Number Page description. this is something bla bla bla"
        path={routes.orderUrl('idj3dj9')}
      />
      <PageWrapper>
        <Breadcrumb title="Orders" />
        <div>Order Page Tracking -</div>
      </PageWrapper>
    </>
  );
};

OrderTrackingNumberPage.getLayout = page => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default OrderTrackingNumberPage;

export const getServerSideProps: GetServerSideProps = async context => {
  const queryClient = getQueryClient();

  const session = await getUserSessionSsr(context);
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
