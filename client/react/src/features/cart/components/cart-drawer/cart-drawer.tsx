import Drawer from '@/features/ui/drawer';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux-store';
import { CartActions } from '../../redux/cart.slice';
import { Button } from '@nextui-org/react';
import { Trash } from 'lucide-react';

export default function CartDrawer() {
  const dispatch = useAppDispatch();
  const { isCartDrawerOpen, cartItems } = useAppSelector(store => store.cart);

  return (
    <Drawer
      open={isCartDrawerOpen}
      direction="right"
      onClose={() => dispatch(CartActions.closeCartDrawer())}
      duration={300}
      className="!w-full sm:!w-[400px] lg:!w-[480px]"
    >
      <div className="w-full divide-y-1">
        {/* Header */}
        <div className="px-4 md:px-6 lg:px-8 flex items-center justify-between">
          <h2 className="text-18 md:text-20 lg:text-24 text-gray-800 font-medium lg:font-semibold">Shopping Cart</h2>
          {cartItems.length === 0 && (
            <Button isIconOnly className="bg-white" onClick={() => {}}>
              <Trash className="h-7 w-7 text-icon cursor-pointer" />
            </Button>
          )}
          <Button onClick={() => dispatch(CartActions.closeCartDrawer())} />
        </div>
        {/* Content */}
        <div className="w-full">{cartItems.length === 0 ? <div>Content here </div> : <div>No content here</div>}</div>
        {/* Footer */}
        <div className="flex items-center justify-around flex-col px-4 md:px-6 lg:px-8">
          <div className="flex">
            <div>
              <h3 className="font-medium text-18">Sub Total:</h3>
              <p className="text-13 md:text-14 leading-5 text-[#595959]">
                Final price and discounts will be determined at the time of payment processing.
              </p>
            </div>
            <p className="ml-4 font-semibold text-18">{0}</p>
          </div>
          <Button onClick={() => {}} fullWidth disabled={cartItems.length === 0}>
            View Cart
          </Button>
          <Button variant="bordered" onClick={() => {}} fullWidth disabled={cartItems.length === 0}>
            Checkout
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
