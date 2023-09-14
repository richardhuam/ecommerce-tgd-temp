import React from 'react';

import LoginForm from '@/modules/auth/components/login-form/login-form';
import AuthLayout from '@/shared/components/layouts/auth-layout';
import { NextPageWithLayout } from '@/shared/models/page.model';

const LoginPage: NextPageWithLayout = () => {
  return <LoginForm />;
};

LoginPage.getLayout = page => {
  return <AuthLayout>{page}</AuthLayout>;
};

export default LoginPage;
