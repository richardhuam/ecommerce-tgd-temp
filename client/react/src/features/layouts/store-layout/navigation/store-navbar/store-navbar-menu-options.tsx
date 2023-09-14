import { useAppDispatch, useAppSelector } from '@/hooks/use-redux-store';
import LoggedInMenuOptions from './store-logged-in-menu-options';
import LoggedOutMenuOptions from './store-logged-out-menu-options';
import { Badge, Button, NavbarContent, NavbarItem } from '@nextui-org/react';
import { Heart, Search, ShoppingBag } from 'lucide-react';
import { ProductActions } from '@/features/products/redux/product.slice';
import { CartActions } from '@/features/cart/redux/cart.slice';

export default function StoreNavbarMenuOptions() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(store => store.auth);
  const { cartQuantity } = useAppSelector(store => store.cart);

  return (
    <NavbarContent justify="end">
      <NavbarItem className="space-x-1">
        <Button
          onClick={() => dispatch(ProductActions.openProductSearchDrawer())}
          isIconOnly
          className="text-icon bg-transparent"
          aria-label="search"
        >
          <Search />
        </Button>
        <Button
          onClick={() => dispatch(CartActions.openCartDrawer())}
          isIconOnly
          className="text-icon bg-transparent"
          aria-label="cart"
        >
          <Badge color="danger" content={cartQuantity} isInvisible={false} shape="circle">
            <ShoppingBag />
          </Badge>
        </Button>
        <Button isIconOnly className="text-icon bg-transparent hidden md:inline-flex" aria-label="heart">
          <Badge color="danger" content={5} isInvisible={false} shape="circle">
            <Heart />
          </Badge>
        </Button>
      </NavbarItem>
      {isAuthenticated ? <LoggedInMenuOptions /> : <LoggedOutMenuOptions />}
    </NavbarContent>
  );
}
