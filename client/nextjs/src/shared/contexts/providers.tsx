import { Hydrate } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import AppQueryClientInstanceWrapper from '../components/core/app-query-client-instance-wrapper';
import { EmptySessionState } from '../models/auth.model';
import { IPageProps } from '../models/page.model';
import { AuthProvider } from './auth.context';
import { CartProvider } from './cart.context';
import { CoreProvider } from './core.context';
import { ProductProvider } from './product.context';
import { QueryClientInstanceProvider } from './query-client.context';
import { WishlistProvider } from './wishlist.context';

type ProvidersProps = {
  children: React.ReactNode;
  pageProps: IPageProps;
};

export function Providers({ pageProps, children }: ProvidersProps) {
  return (
    <QueryClientInstanceProvider>
      <AppQueryClientInstanceWrapper>
        <Hydrate state={pageProps.dehydratedState}>
          <AuthProvider session={pageProps.session ?? EmptySessionState}>
            <CoreProvider>
              <CartProvider>
                <WishlistProvider>
                  <ProductProvider>{children}</ProductProvider>
                </WishlistProvider>
              </CartProvider>
            </CoreProvider>
          </AuthProvider>
        </Hydrate>
        <ReactQueryDevtools />
      </AppQueryClientInstanceWrapper>
    </QueryClientInstanceProvider>
  );
}
