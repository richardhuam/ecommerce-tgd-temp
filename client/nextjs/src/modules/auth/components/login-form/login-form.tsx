import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { routes } from '@/config/routes';
import Button from '@/shared/components/ui/button';
import Input from '@/shared/components/ui/input';
import Paper from '@/shared/components/ui/paper';
import TextDivider from '@/shared/components/ui/text-divider';
import { useAuth } from '@/shared/contexts/auth.context';
import { useLogin } from '@/shared/queries/auth/auth.query';
import { ILoginApiParams } from '@/shared/services/auth/auth.service.types';
import { envService } from '@/shared/services/env/env.service';
import { errorMessageResolver } from '@/shared/utils/api/api-error-message-resolver';
import { imageManager } from '@/shared/utils/image-manager';

import { loginValidationSchema } from './login-validation';

const LoginForm = () => {
  const router = useRouter();
  const { setIsAuthenticated } = useAuth();

  const DEMO_USER_EMAIL = envService().demo.loginEmail || '';
  const DEMO_USER_PASSWORD = envService().demo.loginPassword || '';

  const { mutate: loginMutate, isLoading } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginApiParams>({
    resolver: yupResolver(loginValidationSchema),
    defaultValues: {
      email: DEMO_USER_EMAIL,
      password: DEMO_USER_PASSWORD,
    },
  });

  function onSubmit(values: ILoginApiParams) {
    loginMutate(values, {
      onSuccess: data => {
        if (data.ok) {
          setIsAuthenticated(true);
          router.push(routes.home);
        }
      },
      onError: error => {
        const errorMessage = errorMessageResolver(error);
        toast.error(errorMessage);
      },
    });
  }

  return (
    <Paper className="relative sm:w-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full xl:w-900 flex items-center justify-around lg:gap-10">
          <div className="w-350 lg:flex hidden">
            <Image
              src={imageManager().auth.signIn}
              alt="sign-in fall"
              className="w-[320px] h-auto lg:absolute bottom-0 left-14 xl:left-24"
            />
          </div>
          <div className="flex items-center justify-center flex-col w-400">
            <h2 className="font-semibold text-20 uppercase mb-2">SIGN IN</h2>
            <div className="w-full space-y-4">
              <div>
                <Input label="Email" type="email" placeholder="john@gmail.com" error={errors.email?.message} {...register('email')} />
              </div>
              <div>
                <Input
                  label="Password"
                  type="password"
                  placeholder="***********"
                  error={errors.password?.message}
                  {...register('password')}
                />
              </div>
              <Button type="submit" fullWidth className="uppercase" loading={isLoading} disabled={isLoading}>
                Sign In
              </Button>
              <TextDivider text="Don't have an account yet?" />
              <div>
                <Link href={routes.signUp}>
                  <Button type="button" fullWidth variant="outline" className="uppercase">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Paper>
  );
};

export default LoginForm;
