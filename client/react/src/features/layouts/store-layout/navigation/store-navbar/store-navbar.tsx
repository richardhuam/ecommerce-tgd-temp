import { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link as NavbarLink,
} from '@nextui-org/react';
import Logo from '@/features/ui/logo';
import { Link, useLocation } from 'react-router-dom';
import { STORE_ROUTES } from '@/config/routes.config';
import StoreNavbarMenuOptions from './store-navbar-menu-options';

type StoreNavbarProps = {};

export default function StoreNavbar({}: StoreNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const location = useLocation();

  const menuItems = [
    'Profile',
    'Dashboard',
    'Activity',
    'Analytics',
    'System',
    'Deployments',
    'My Settings',
    'Team Settings',
    'Help & Feedback',
    'Log Out',
  ];

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="xl"
      className="z-navbar bg-white shadow-navbar"
    >
      <NavbarContent>
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="sm:hidden" />
        <NavbarBrand>
          <Logo url={STORE_ROUTES.HOME} />
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden lg:flex gap-4" justify="center">
        <NavbarItem isActive={location.pathname === STORE_ROUTES.HOME}>
          <NavbarLink
            as={Link}
            color={location.pathname === STORE_ROUTES.HOME ? 'primary' : 'foreground'}
            to={STORE_ROUTES.HOME}
          >
            Home
          </NavbarLink>
        </NavbarItem>
        <NavbarItem isActive={location.pathname === STORE_ROUTES.ABOUT}>
          <NavbarLink
            as={Link}
            color={location.pathname === STORE_ROUTES.ABOUT ? 'primary' : 'foreground'}
            to={STORE_ROUTES.ABOUT}
          >
            About
          </NavbarLink>
        </NavbarItem>
        <NavbarItem isActive={location.pathname === STORE_ROUTES.CONTACT}>
          <NavbarLink
            as={Link}
            color={location.pathname === STORE_ROUTES.CONTACT ? 'primary' : 'foreground'}
            to={STORE_ROUTES.CONTACT}
          >
            Contact
          </NavbarLink>
        </NavbarItem>
      </NavbarContent>
      <StoreNavbarMenuOptions />
      {/* Mobile menu */}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={index === 2 ? 'primary' : index === menuItems.length - 1 ? 'danger' : 'foreground'}
              className="w-full"
              to="#"
              onClick={() => closeMenu()}
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
