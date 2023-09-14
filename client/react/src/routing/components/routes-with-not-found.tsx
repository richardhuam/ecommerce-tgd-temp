import NotFoundPage from '@/pages/404/not-found.page';
import { Route, Routes } from 'react-router-dom';

type RoutesWithNotFoundProps = {
  children: React.ReactNode;
};

export default function RoutesWithNotFound({ children }: RoutesWithNotFoundProps) {
  return (
    <Routes>
      {children}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
