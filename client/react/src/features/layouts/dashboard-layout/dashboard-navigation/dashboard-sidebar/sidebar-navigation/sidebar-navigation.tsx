import { useState } from 'react';
import SidebarNavigationSubMenu from './sidebar-navigation-sub-menu';
import SidebarNavigationMenu from './sidebar-navigation-menu';
import { SIDEBAR_NAVBAR_LINKS } from './sidebar-navigation-links';

type SidebarNavigationProps = {};

export default function SidebarNavigation({}: SidebarNavigationProps) {
  const [selectedMenu, setSelectedMenu] = useState<number | null>(null);

  function handleToggle(index: number) {
    if (selectedMenu === index) {
      setSelectedMenu(null);
      return;
    }
    setSelectedMenu(index);
  }

  return (
    <div className="p-2 md:p-4">
      <div className="p-2 space-y-2">
        <h2 className="text-[#000000DE] uppercase text-sm opacity-50">DASHBOARD</h2>
        {SIDEBAR_NAVBAR_LINKS.map((item, index) => {
          if (item.subs.length === 0) {
            return (
              <SidebarNavigationMenu index={index} setSelectedMenu={setSelectedMenu} key={item.path} navLink={item} />
            );
          } else {
            return (
              <SidebarNavigationSubMenu
                index={index}
                selectedMenu={selectedMenu}
                setSelectedMenu={setSelectedMenu}
                handleToggle={handleToggle}
                key={item.path}
                navLink={item}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
