import { RiDeleteBin2Line } from 'react-icons/ri';

import { useCart } from '@/shared/contexts/cart.context';

export default function ClearCartButton() {
  const { clearCart } = useCart();
  return (
    <button onClick={clearCart} className="flex items-center justify-center">
      <span className="text-14 text-gray-600 flex gap-1 h-full">
        <RiDeleteBin2Line className="text-18" />
        Clear Cart
      </span>
    </button>
  );
}
