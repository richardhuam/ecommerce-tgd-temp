import { createContext, useContext, useMemo, useState } from 'react';

import { localStorageKey } from '@/config/localstorage-keys';
import { ICartItems } from '@/shared/models/cart.model';
import { IProduct } from '@/shared/models/product.model';

import { useLocalStorage } from '../hooks/use-localstorage';

const CartContext = createContext(
  {} as {
    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    cartItems: ICartItems[];
    cartQuantity: number;
    isCartItemsLoading: boolean;
    totalPriceCart: number;
    getCartItemQuantity: (productId: string) => number;
    addItemToCart: (product: IProduct) => void;
    decreaseCartItemQuantity: (product: IProduct) => void;
    removeItemFromCart: (productId: string) => void;
    clearCart: () => void;
  },
);

type CartProviderProps = {
  children: React.ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems, isCartItemsLoading] = useLocalStorage<ICartItems[]>(localStorageKey.shoppingCartKey, []);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartQuantity = useMemo(() => {
    return cartItems.reduce((quantity, item) => item.quantity + quantity, 0);
  }, [cartItems]);

  const totalPriceCart = useMemo(() => {
    return cartItems.reduce((total, cartItem) => {
      return total + (cartItem.product.pricing.discountedPrice || 0) * cartItem.quantity;
    }, 0);
  }, [cartItems]);

  const getCartItemQuantity = (productId: string) => {
    return cartItems.find(item => item.product._id === productId)?.quantity || 0;
  };

  const addItemToCart = (product: IProduct) => {
    setCartItems(prevItems => {
      //add product to cart if product does not exist in cart
      if (prevItems.find(item => item.product._id === product._id) == null) {
        return [...prevItems, { product, quantity: 1 }];
        //increase plus one product quantity if it is already in cart
      } else {
        return prevItems.map(item => {
          if (item.product._id === product._id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseCartItemQuantity = (product: IProduct) => {
    setCartItems(prevItems => {
      // remove item if the quantity is 1
      if (prevItems.find(item => item.product._id === product._id)?.quantity === 1) {
        return prevItems.filter(item => item.product._id !== product._id);
        //decrease product quantity if it is already in cart
      } else {
        return prevItems.map(item => {
          if (item.product._id === product._id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const removeItemFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(cartItem => cartItem.product._id !== productId));
  };

  const clearCart = () => setCartItems([]);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        openCart,
        closeCart,
        cartItems,
        isCartItemsLoading,
        cartQuantity,
        getCartItemQuantity,
        addItemToCart,
        decreaseCartItemQuantity,
        clearCart,
        removeItemFromCart,
        totalPriceCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
