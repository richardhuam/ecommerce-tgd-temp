import Link from 'next/link';

import { Avatar, AvatarPlaceHolder } from '@/shared/components/ui/avatar';
import { useAuth } from '@/shared/contexts/auth.context';
import { useCore } from '@/shared/contexts/core.context';
import { useLogout } from '@/shared/queries/auth/auth.query';
import { navbarLinks } from '@/shared/utils/navbar-links';

const SidebarMenuLoggedIn = () => {
  const { closeUserMenuDrawer } = useCore();
  const { me } = useAuth();

  const { mutate: logout } = useLogout();

  return (
    <>
      <div className="flex items-center justify-center gap-2">
        <p className="py-2 text-18 text-primary">Hi, {me.firstName}</p>
        {me.avatar ? <Avatar image={me.avatar} /> : <AvatarPlaceHolder name={me.firstName} />}
      </div>
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
      <button
        onClick={() => {
          closeUserMenuDrawer();
          logout();
        }}
        className="w-full block text-center py-2 text-18 font-medium text-primary"
      >
        Logout
      </button>
    </>
  );
};

export default SidebarMenuLoggedIn;
