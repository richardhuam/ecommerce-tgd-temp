import { STORE_ROUTES } from '@/config/routes.config';
import TextDivider from '@/features/ui/text-divider';
import { useAppDispatch } from '@/hooks/use-redux-store';
import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthThunk } from '../../redux/auth.thunk';

type LoginFormProps = {};

export default function LoginForm({}: LoginFormProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const apiValues = { email: 'test123@gmail.com', password: '12345678' };

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(AuthThunk.login({ apiValues, navigate }));
  }

  return (
    <form onSubmit={e => handleLogin(e)}>
      <Card shadow="sm" className="py-4 sm:py-6 sm:px-2 w-[350px]">
        <CardHeader className="justify-center font-semibold">AUTHENTICATE USER</CardHeader>
        <CardBody>
          <div className="flex flex-col gap-4">
            <Input radius="sm" variant="bordered" type="text" label="Email" fullWidth />
            <Input
              radius="sm"
              variant="bordered"
              label="Password"
              type={isVisible ? 'text' : 'password'}
              fullWidth
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <Eye className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
            />
            <Button type="submit" radius="sm" color="primary" className="text-white">
              Log In
            </Button>
            <TextDivider text="Don't have an account yet?" />
            <Button
              as={Link}
              to={STORE_ROUTES.SIGN_UP}
              radius="sm"
              color="default"
              variant="faded"
              className="border-transparent"
            >
              Sign Up
            </Button>
          </div>
        </CardBody>
      </Card>
    </form>
  );
}
