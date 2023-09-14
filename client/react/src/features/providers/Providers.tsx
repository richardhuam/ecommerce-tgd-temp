import { reduxStore } from '@/config/store.config';
import { NextUIProvider } from '@nextui-org/react';
import { Provider } from 'react-redux';

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <NextUIProvider>
      <Provider store={reduxStore}>{children}</Provider>
    </NextUIProvider>
  );
}
