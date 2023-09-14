import { useLocation } from 'react-router-dom';
import { IDashboardNavbarLink } from './sidebar-navigation-links';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux-store';
import { useEffect } from 'react';
import { Button } from '@nextui-org/react';
import { ChevronRight } from 'lucide-react';
import { SidebarActions } from '../dashboard-sidebar.slice';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BREAKPOINTS } from '@/config/breakpoints.config';

type SidebarNavigationSubMenuProps = {
  navLink: IDashboardNavbarLink;
  index: number;
  selectedMenu: number | null;
  setSelectedMenu: React.Dispatch<React.SetStateAction<number | null>>;
  handleToggle: (index: number) => void;
};

export default function SidebarNavigationSubMenu({
  handleToggle,
  index,
  navLink,
  selectedMenu,
  setSelectedMenu,
}: SidebarNavigationSubMenuProps) {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { screenSize, isSidebarOpen } = useAppSelector(store => store.sidebar);

  const isIndexPathActive = location.pathname.startsWith(navLink.path);

  function handleCloseSidebar() {
    if (isSidebarOpen && screenSize && screenSize <= BREAKPOINTS.xl) {
      dispatch(SidebarActions.closeSidebar());
    }
  }

  useEffect(() => {
    if (isIndexPathActive) {
      setSelectedMenu(index);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIndexPathActive]);

  return (
    <>
      <Button
        onClick={() => handleToggle(index)}
        className={`bg-white justify-start gap-4 h-[45px] ${
          isIndexPathActive ? 'bg-primary text-white' : 'hover:bg-gray-100 text-[#000000DE]'
        }`}
        radius="sm"
        fullWidth
        startContent={
          <ChevronRight
            size={17.5}
            strokeWidth={1.25}
            className={`absolute right-4 ease-linear duration-75 ${
              selectedMenu === index
                ? `rotate-90 ${isIndexPathActive ? 'text-white' : 'text-gray-400'}`
                : `${!isIndexPathActive ? 'text-gray-400' : ''}`
            }`}
          />
        }
      >
        <navLink.icon strokeWidth={1.25} />
        <span>{navLink.title}</span>
      </Button>
      {navLink.subs?.map(sub => {
        const isActivePath = location.pathname === sub.path;
        return (
          <AnimatePresence key={sub.path}>
            {selectedMenu === index && (
              <motion.div
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: 'auto' },
                  collapsed: { opacity: 0, height: 0 },
                  exit: { opacity: 0, height: 0 },
                }}
              >
                <Button
                  as={Link}
                  key={sub.path}
                  to={sub.path}
                  onClick={handleCloseSidebar}
                  fullWidth
                  radius="sm"
                  className={`bg-white justify-start gap-4 h-[45px] ${
                    isActivePath ? ' text-primary' : 'hover:bg-gray-100 text-[#000000DE]'
                  }`}
                >
                  <span className="ml-10">{sub.title}</span>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        );
      })}
    </>
  );
}
