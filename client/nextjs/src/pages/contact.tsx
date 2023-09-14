import { dehydrate } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import React from 'react';

import { routes } from '@/config/routes';
import ContactForm from '@/modules/contact/components/contact-form';
import PrimaryLayout from '@/shared/components/layouts/primary-layout';
import GoogleMapLocation from '@/shared/components/location/google-map-location';
import Seo from '@/shared/components/seo/seo';
import Breadcrumb from '@/shared/components/ui/breadcrumb';
import PageWrapper from '@/shared/components/ui/page-wrapper';
import { getQueryClient } from '@/shared/libs/get-query-client';
import { NextPageWithLayout } from '@/shared/models/page.model';
import { getUserSessionSsr } from '@/shared/utils/auth/get-user-session-ssr';

const ContactPage: NextPageWithLayout = () => {
  return (
    <>
      <Seo title="Contact title" description="Contact description. this is something bla bla bla" path={routes.contact} />
      <PageWrapper>
        <Breadcrumb title="Contact" />
        <GoogleMapLocation />
        <ContactForm />
      </PageWrapper>
    </>
  );
};

ContactPage.getLayout = page => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default ContactPage;

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
