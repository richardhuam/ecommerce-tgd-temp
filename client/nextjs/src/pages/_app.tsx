import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import '@/assets/css/global.css';
import '@/assets/css/drawer.css';
import '@/assets/css/custom-plugin.css';

import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { ReactElement } from 'react';
import { Toaster } from 'react-hot-toast';

import TailwindIndicator from '@/shared/components/development/tailwind-indicator';
import ProductSearchDrawer from '@/shared/components/drawers/product-search/product-search-drawer';
import ShoppingCartDrawer from '@/shared/components/drawers/shopping-cart/shopping-cart-drawer';
import SidebarMenuDrawer from '@/shared/components/drawers/sidebar-menu/sidebar-menu';
import { Providers } from '@/shared/contexts/providers';
import { NextPageWithLayout } from '@/shared/models/page.model';

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

export default function App({ Component, pageProps }: AppPropsWithLayout): ReactElement {
  const getLayout = Component.getLayout ?? (page => page);

  return (
    <Providers pageProps={pageProps}>
      <NextNProgress />
      {getLayout(<Component {...pageProps} />)}
      <ProductSearchDrawer />
      <ShoppingCartDrawer />
      <SidebarMenuDrawer />
      <TailwindIndicator />
      <Toaster />
    </Providers>
  );
}
