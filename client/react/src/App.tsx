import TailwindIndicator from './features/development/tailwind-indicator';

import useInitializeApp from './hooks/use-initialize-app';
import ProductSearchDrawer from './features/products/components/product-search-drawer/product-search-drawer';
import CartDrawer from './features/cart/components/cart-drawer/cart-drawer';
import AppRouter from './routing/components/app-router';

function App() {
  useInitializeApp();

  return (
    <>
      <AppRouter />
      <ProductSearchDrawer />
      <CartDrawer />
      <TailwindIndicator />
    </>
  );
}

export default App;
