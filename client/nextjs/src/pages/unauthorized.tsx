import Image from 'next/image';
import React from 'react';

import UnauthorizedSvg from '@/assets/images/svg/unauthorized.svg';
import { routes } from '@/config/routes';
import AuthLayout from '@/shared/components/layouts/auth-layout';
import Button from '@/shared/components/ui/button';
import { NextPageWithLayout } from '@/shared/models/page.model';

const UnauthorizedPage: NextPageWithLayout = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center space-y-4">
      <Image src={UnauthorizedSvg} priority alt="not-found-page" className="w-full xs:w-300 lg:w-400" />
      <div className="flex flex-col items-center justify-start space-y-1">
        <h2 className="text-2xl md:text-3xl font-medium">Unauthorized</h2>
        <p className="text-16 md:text-18">You are not allowed to see this content</p>
      </div>
      <a href={routes.home} className="text-primary-darker underline">
        <Button>Go Home</Button>
      </a>
    </div>
  );
};

UnauthorizedPage.getLayout = page => {
  return <AuthLayout>{page}</AuthLayout>;
};

export default UnauthorizedPage;
