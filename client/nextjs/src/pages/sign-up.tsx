import React from 'react';

import SignUpForm from '@/modules/auth/components/sign-up-form/sign-up-form';
import AuthLayout from '@/shared/components/layouts/auth-layout';
import { NextPageWithLayout } from '@/shared/models/page.model';

const RegisterPage: NextPageWithLayout = () => {
  return <SignUpForm />;
};

RegisterPage.getLayout = page => {
  return <AuthLayout>{page}</AuthLayout>;
};

export default RegisterPage;
