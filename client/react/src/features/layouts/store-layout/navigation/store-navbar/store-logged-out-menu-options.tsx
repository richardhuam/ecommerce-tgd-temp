import { STORE_ROUTES } from '@/config/routes.config';
import { Button, NavbarItem } from '@nextui-org/react';
import { Link } from 'react-router-dom';

export default function LoggedOutMenuOptions() {
  return (
    <>
      <NavbarItem>
        <Button radius="sm" as={Link} to={STORE_ROUTES.LOGIN} color="primary">
          Login
        </Button>
      </NavbarItem>
      <NavbarItem className="hidden lg:flex">
        <Button radius="sm" as={Link} color="primary" to={STORE_ROUTES.SIGN_UP} variant="flat">
          Sign Up
        </Button>
      </NavbarItem>
    </>
  );
}
