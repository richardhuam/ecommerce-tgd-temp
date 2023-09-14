import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { routes } from '@/config/routes';
import { sizeConfig } from '@/config/sizing';
import { useCart } from '@/shared/contexts/cart.context';
import { formatCurrency } from '@/shared/utils/format-currency';

import Button from '../../ui/button';
import CloseButton from '../../ui/close-button';
import ClearCartButton from './sub-components/clean-cart-button';
import ShoppingCartContent from './sub-components/shopping-cart-content';
import ShoppingCartEmpty from './sub-components/shopping-cart-empty';

const Drawer = dynamic(() => import('@/shared/components/drawers/drawer'), { ssr: false });

const ShoppingCartDrawer = () => {
  const router = useRouter();
  const { cartItems, isCartOpen, closeCart, totalPriceCart } = useCart();

  const isCartEmpty = cartItems.length === 0;

  function handleGoToCheckout() {
    router.push(routes.checkout);
    closeCart();
  }

  function handleGoToCart() {
    router.push(routes.cart);
    closeCart();
  }

  return (
    <Drawer open={isCartOpen} direction="right" onClose={closeCart} duration={300} className="!w-full sm:!w-[400px] lg:!w-[480px]">
      <div className="w-full divide-y-1">
        {/* Header */}
        <div className="px-4 md:px-6 lg:px-8 flex items-center justify-between" style={{ height: `${sizeConfig().cartDrawer.header}px` }}>
          <h2 className="text-18 md:text-20 lg:text-24 text-gray-800 font-medium lg:font-semibold">Shopping Cart</h2>
          {!isCartEmpty && <ClearCartButton />}
          <CloseButton onClose={closeCart} />
        </div>
        {/* Content */}
        <div className="w-full">{isCartEmpty ? <ShoppingCartEmpty /> : <ShoppingCartContent />}</div>
        {/* Footer */}
        <div
          className="flex items-center justify-around flex-col px-4 md:px-6 lg:px-8"
          style={{ height: `${sizeConfig().cartDrawer.footer}px` }}
        >
          <div className="flex">
            <div>
              <h3 className="font-medium text-18">Sub Total:</h3>
              <p className="text-13 md:text-14 leading-5 text-[#595959]">
                Final price and discounts will be determined at the time of payment processing.
              </p>
            </div>
            <p className="ml-4 font-semibold text-18">{formatCurrency(totalPriceCart)}</p>
          </div>
          <Button onClick={handleGoToCart} fullWidth disabled={isCartEmpty}>
            View Cart
          </Button>
          <Button variant="outline" onClick={handleGoToCheckout} fullWidth disabled={isCartEmpty}>
            Checkout
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default ShoppingCartDrawer;
