import { GetServerSideProps } from 'next';

import CheckoutSuccessSection from '@/modules/checkout/sections/checkout-success-section';
import PrimaryLayout from '@/shared/components/layouts/primary-layout';
import PageWrapper from '@/shared/components/ui/page-wrapper';
import { NextPageWithLayout } from '@/shared/models/page.model';

const CheckoutSuccessPage: NextPageWithLayout = context => {
  const orderId = (context as { orderId: string | null }).orderId;

  return (
    <>
      <PageWrapper>
        <CheckoutSuccessSection orderId={orderId} />
      </PageWrapper>
    </>
  );
};

CheckoutSuccessPage.getLayout = page => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default CheckoutSuccessPage;

export const getServerSideProps: GetServerSideProps = async context => {
  let orderId: string | null = null;

  if (Object.keys(context.query).length > 0) {
    const queryOrderId = context.query?.orderId || null;
    orderId = Array.isArray(queryOrderId) ? queryOrderId[0] : queryOrderId;
  }

  return {
    props: {
      orderId,
    },
  };
};
