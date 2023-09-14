import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiSearch } from 'react-icons/fi';
import { HiOutlineHeart, HiOutlineShoppingBag } from 'react-icons/hi';
import { TfiMenu } from 'react-icons/tfi';

import { routes } from '@/config/routes';
import { useAuth } from '@/shared/contexts/auth.context';
import { useCart } from '@/shared/contexts/cart.context';
import { useCore } from '@/shared/contexts/core.context';
import { useProduct } from '@/shared/contexts/product.context';
import { useWishlist } from '@/shared/contexts/wishlist.context';
import { useGetWishlist } from '@/shared/queries/wishlist/wishlist.query';
import { navbarLinks } from '@/shared/utils/navbar-links';

import Logo from '../../ui/logo';
import MenuItems from './sub-components/menu-items';
import MenuItemsCollapse from './sub-components/menu-items-collapse';
import UserMenuOptionsLoggedIn from './sub-components/user-menu-options-logged-in';
import UserMenuOptionsLoggedOut from './sub-components/user-menu-options-logged-out';

const Navbar = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { toggleUserMenuDrawer } = useCore();
  const { toggleProductSearchDrawer } = useProduct();
  const { cartQuantity, openCart } = useCart();
  const { page } = useWishlist();
  const { data: wishlist } = useGetWishlist({ page });

  return (
    <header className="h-[60px] select-none xl:h-[72px] sticky top-0 z-navbar bg-white shadow-navbar">
      <div className="main-container relative h-full flex items-center justify-between">
        <Logo />
        <nav className="hidden lg:flex">
          <ul className="flex text-15 font-medium items-center justify-center">
            {navbarLinks.map((item, idx) => (item.path ? <MenuItems key={idx} item={item} /> : <MenuItemsCollapse key={idx} />))}
          </ul>
        </nav>
        <div className="flex gap-4 items-center justify-center">
          <button disabled={router.pathname.startsWith(routes.productSearchBase())} onClick={toggleProductSearchDrawer} className="group">
            <FiSearch className="text-24 text-gray-600 group-disabled:text-transparent" />
          </button>
          <button disabled={router.pathname === routes.checkout} onClick={openCart} className="relative text-gray-600 group">
            <HiOutlineShoppingBag className="text-24 group-disabled:text-gray-400" />
            <span className="absolute -top-1.5 -right-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary group-disabled:bg-gray-400 text-10 text-white">
              {cartQuantity}
            </span>
          </button>
          <Link href={routes.wishlist} className="relative hidden lg:flex">
            <HiOutlineHeart className="text-24 text-gray-600" />
            <span className="absolute -top-1.5 -right-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-10 text-white">
              {wishlist?.data.collection.length ?? 0}
            </span>
          </Link>
          <div className="hidden lg:flex">{isAuthenticated ? <UserMenuOptionsLoggedIn /> : <UserMenuOptionsLoggedOut />}</div>
          {/* Mobile menu */}
          <button onClick={toggleUserMenuDrawer} className="flex lg:hidden">
            <span className="text-24 text-gray-600">
              <TfiMenu />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
