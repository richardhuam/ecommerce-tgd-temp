import Link from 'next/link';
import { useRouter } from 'next/router';

import { INavMenuOption } from '@/shared/models/navigation.model';

interface MenuItemsProps {
  item: INavMenuOption;
}

const MenuItems: React.FC<MenuItemsProps> = ({ item }) => {
  const router = useRouter();
  return (
    <li>
      <Link
        href={item.path!}
        className={`px-3 py-5 text-gray-800 hover:text-primary flex items-center justify-center ${item.path === router.pathname && ''}`}
      >
        {item.title}
      </Link>
    </li>
  );
};

export default MenuItems;
