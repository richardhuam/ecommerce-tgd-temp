import { dehydrate } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import CheckoutFailureSection from '@/modules/checkout/sections/checkout-failure-section';
import PrimaryLayout from '@/shared/components/layouts/primary-layout';
import Breadcrumb from '@/shared/components/ui/breadcrumb';
import PageWrapper from '@/shared/components/ui/page-wrapper';
import { useAuth } from '@/shared/contexts/auth.context';
import { getQueryClient } from '@/shared/libs/get-query-client';
import { NextPageWithLayout } from '@/shared/models/page.model';
import { getUserSessionSsr } from '@/shared/utils/auth/get-user-session-ssr';
import { authenticateClientSide } from '@/shared/utils/authenticate-client-side';

const CheckoutFailurePage: NextPageWithLayout = () => {
  const router = useRouter();
  const { setIsAuthenticated, setMe, isAuthenticated } = useAuth();

  async function authenticateUser() {
    // if server-side authentication fails, then try to authenticate user using client-side
    if (!isAuthenticated) {
      await authenticateClientSide({ setIsAuthenticated, setMe, router });
    }
  }

  useEffect(() => {
    authenticateUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PageWrapper>
        <Breadcrumb title="Checkout Failure" />
        <CheckoutFailureSection />
      </PageWrapper>
    </>
  );
};

CheckoutFailurePage.getLayout = page => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default CheckoutFailurePage;

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
