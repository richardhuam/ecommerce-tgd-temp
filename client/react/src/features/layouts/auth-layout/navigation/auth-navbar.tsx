import { STORE_ROUTES } from '@/config/routes.config';
import Logo from '@/features/ui/logo';

type AuthNavbarProps = {};

export default function AuthNavbar({}: AuthNavbarProps) {
  return (
    <header className="w-full bg-white z-navbar fixed top-0 flex items-center justify-center h-[60px] xl:h-[72px]">
      <Logo size="sm" url={STORE_ROUTES.HOME} />
    </header>
  );
}
