import Container from '../container';
import AuthNavbar from './navigation/auth-navbar';

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main>
      <AuthNavbar />
      <div className="h-screen bg-[#F6F6F6]">
        <Container className="h-full flex items-center justify-center">{children}</Container>
      </div>
    </main>
  );
}
