import Link from 'next/link';

import { routes } from '@/config/routes';
import { useCore } from '@/shared/contexts/core.context';
import { navbarLinks } from '@/shared/utils/navbar-links';

const SidebarMenuLoggedOut = () => {
  const { closeUserMenuDrawer } = useCore();

  return (
    <>
      <div>
        <Link href={routes.login} className="w-full block text-center py-2 text-18 font-medium text-primary" onClick={closeUserMenuDrawer}>
          Login
        </Link>
        <Link href={routes.signUp} className="w-full block text-center py-2 text-18 font-medium text-primary" onClick={closeUserMenuDrawer}>
          Sign Up
        </Link>
        {navbarLinks.map((item, idx) => (
          <Link
            key={idx}
            href={`${item.path}`}
            className="w-full block text-center py-2 text-18 font-medium text-primary"
            onClick={closeUserMenuDrawer}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </>
  );
};

export default SidebarMenuLoggedOut;
