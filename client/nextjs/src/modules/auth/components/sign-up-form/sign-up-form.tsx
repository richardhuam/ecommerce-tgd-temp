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
import { useSignUp } from '@/shared/queries/auth/auth.query';
import { ISignUpApiParams } from '@/shared/services/auth/auth.service.types';
import { errorMessageResolver } from '@/shared/utils/api/api-error-message-resolver';
import { imageManager } from '@/shared/utils/image-manager';

import { signUpValidationSchema } from './sign-up-validation';

const SignUpForm = () => {
  const { mutate: signUpMutate, isLoading } = useSignUp();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpApiParams>({
    resolver: yupResolver(signUpValidationSchema),
  });

  function onSubmit(values: ISignUpApiParams) {
    signUpMutate(values, {
      onSuccess: data => {
        if (data.ok) {
          router.push(routes.login);
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
        <div className="w-full xl:w-1100 flex items-center justify-around lg:gap-10">
          <div className="w-400 lg:flex hidden">
            <Image
              src={imageManager().auth.signUp}
              alt="sign-in fall"
              className="w-[420px] xl:w-450 h-auto lg:absolute bottom-0 left-8 xl:left-16"
            />
          </div>
          <div className="flex items-center justify-center flex-col w-400 lg:w-450 xl:w-500">
            <h2 className="font-semibold text-20 uppercase mb-2">SIGN UP</h2>
            <div className="w-full space-y-4">
              <div className="flex gap-4 sm:gap-2 flex-col sm:flex-row">
                <div>
                  <Input label="First Name" type="text" placeholder="John" error={errors.firstName?.message} {...register('firstName')} />
                </div>
                <div>
                  <Input label="Last Name" type="text" placeholder="Smith" error={errors.lastName?.message} {...register('lastName')} />
                </div>
              </div>
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
              <div>
                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="***********"
                  error={errors.confirmPassword?.message}
                  {...register('confirmPassword')}
                />
              </div>
              <Button type="submit" fullWidth className="uppercase" loading={isLoading} disabled={isLoading}>
                Sign Up
              </Button>
              <TextDivider text="Already have an account?" />
              <div>
                <Link href="/login">
                  <Button type="button" fullWidth variant="outline" className="uppercase">
                    Sign In
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

export default SignUpForm;
