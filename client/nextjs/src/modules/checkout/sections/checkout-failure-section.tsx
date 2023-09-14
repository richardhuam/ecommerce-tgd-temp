import { useRouter } from 'next/router';

import { routes } from '@/config/routes';
import Button from '@/shared/components/ui/button';

type CheckoutFailureSectionProps = {};

export default function CheckoutFailureSection({}: CheckoutFailureSectionProps) {
  const router = useRouter();
  return (
    <div>
      <h1 className="text-24 md:text-28 lg:mb-2 lg:text-32 font-medium">Woops, We could not process your order.</h1>
      <Button onClick={() => router.push(routes.home)}>Go Home</Button>
    </div>
  );
}
