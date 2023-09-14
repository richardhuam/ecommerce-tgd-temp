import dynamic from 'next/dynamic';

import { useAuth } from '@/shared/contexts/auth.context';
import { useCore } from '@/shared/contexts/core.context';

import CloseButton from '../../ui/close-button';
import SidebarMenuLoggedIn from './sub-components/sidebar-menu-logged-in';
import SidebarMenuLoggedOut from './sub-components/sidebar-menu-logged-out';

const Drawer = dynamic(() => import('@/shared/components/drawers/drawer'), { ssr: false });

const SidebarMenuDrawer = () => {
  const { isAuthenticated } = useAuth();
  const { isUserMenuDrawerOpen, closeUserMenuDrawer } = useCore();

  return (
    <>
      <Drawer
        open={isUserMenuDrawerOpen}
        direction="left"
        onClose={closeUserMenuDrawer}
        duration={300}
        className="!w-full xs:!w-[85%] sm:!w-[400px] lg:!w-[450px]"
      >
        <div className="w-full divide-y-1">
          {/* Header */}
          <div className="h-[65px] px-4 md:px-6 lg:px-8 flex items-center justify-between">
            <h2 className="text-18 md:text-20 lg:text-24 text-gray-800 font-medium lg:font-semibold">Menu</h2>
            <CloseButton onClose={closeUserMenuDrawer} />
          </div>
          {/* Content */}
          {isAuthenticated ? <SidebarMenuLoggedIn /> : <SidebarMenuLoggedOut />}
        </div>
      </Drawer>
    </>
  );
};

export default SidebarMenuDrawer;
