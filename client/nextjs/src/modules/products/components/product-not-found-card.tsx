import { useRouter } from 'next/router';
import { BsSearch } from 'react-icons/bs';

import Button from '@/shared/components/ui/button';
import Paper from '@/shared/components/ui/paper';
import { useProduct } from '@/shared/contexts/product.context';

export default function ProductNotFoundCard() {
  const { productSearch } = useProduct();
  const router = useRouter();
  return (
    <Paper className="mx-auto w-full max-w-5xl mt-10 py-6">
      <div className="flex space-x-4 md:space-x-6 lg:space-x-10">
        <div className="shrink-0 my-auto">
          <BsSearch className="text-[40px] md:text-[60px] text-primary" />
        </div>
        <div className="flex-grow">
          <h1 className="font-medium text-15 md:text-18 lg:text-20">We could not find any result based on your search:</h1>
          <p className="font-semibold text-15 md:text-20 lg:text-24 whitespace-normal break-words">{productSearch.keyWord}</p>
          <div className="mt-4">
            <Button onClick={() => router.back()} variant="outline">
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </Paper>
  );
}
