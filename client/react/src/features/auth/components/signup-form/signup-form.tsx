import { STORE_ROUTES } from '@/config/routes.config';
import TextDivider from '@/features/ui/text-divider';
import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type SignUpFormProps = {};

export default function SignUpForm({}: SignUpFormProps) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <Card shadow="sm" className="py-4 sm:py-6 sm:px-2 w-[350px]">
      <CardHeader className="justify-center font-semibold">REGISTER USER</CardHeader>
      <CardBody>
        <div className="flex flex-col gap-4">
          <Input radius="sm" variant="bordered" type="text" label="Email" fullWidth />
          <Input
            radius="sm"
            variant="bordered"
            type={isVisible ? 'text' : 'password'}
            label="Password"
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
          <Input
            type={isVisible ? 'text' : 'password'}
            radius="sm"
            variant="bordered"
            label="Confirm Password"
            fullWidth
          />
          <Button radius="sm" color="primary" className="text-white">
            Create account
          </Button>
          <TextDivider text="Already have an account?" />
          <Button
            as={Link}
            to={STORE_ROUTES.LOGIN}
            radius="sm"
            color="default"
            variant="faded"
            className="border-transparent"
          >
            Log in
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
