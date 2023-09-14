import StoreNavbar from './navigation/store-navbar/store-navbar';
import StoreFooter from './navigation/store.footer';

type StoreLayoutProps = { children: React.ReactNode };

export default function StoreLayout({ children }: StoreLayoutProps) {
  return (
    <>
      <StoreNavbar />
      {children}
      <StoreFooter />
    </>
  );
}
