import { AiOutlineLogout, AiOutlineShoppingCart, AiOutlineStar, AiOutlineUser, AiOutlineUserAdd } from 'react-icons/ai';

import { routes } from '@/config/routes';

type LoggedInMenuLinksProps = {
  title: string;
  path?: string;
  icon: JSX.Element;
};

type LoggedOutMenuLinkProps = {
  title: string;
  path: string;
  icon: JSX.Element;
};

export const loggedInMenuLinks: LoggedInMenuLinksProps[] = [
  {
    title: 'My Profile',
    path: routes.profile,
    icon: <AiOutlineUser />,
  },
  {
    title: 'My Orders',
    path: routes.orders,
    icon: <AiOutlineShoppingCart />,
  },
  {
    title: 'Reviews',
    path: routes.reviews,
    icon: <AiOutlineStar />,
  },
  {
    title: 'Log Out',
    path: undefined,
    icon: <AiOutlineLogout />,
  },
];

export const loggedOutMenuLinks: LoggedOutMenuLinkProps[] = [
  {
    title: 'Login',
    path: routes.login,
    icon: <AiOutlineUser />,
  },
  {
    title: 'Sign Up',
    path: routes.signUp,
    icon: <AiOutlineUserAdd />,
  },
];
