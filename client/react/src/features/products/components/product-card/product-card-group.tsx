import { IProduct } from '../../product.interface';
import { Button } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { STORE_ROUTES } from '@/config/routes.config';
import ProductCard from './product-card';

type ProductCardGroupProps = {
  productData: IProduct[];
  title: string;
};

export default function ProductCardGroup({ productData = [], title }: ProductCardGroupProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2.5">
        <div>
          <h2 className="font-semibold text-xl">{title}</h2>
        </div>
        <Button as={Link} to={STORE_ROUTES.HOME} variant="bordered" radius="sm">
          Watch More
        </Button>
      </div>
      <div className="gap-2 sm:gap-3 2xl:gap-4 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {productData.map(product => (
          <ProductCard key={product._id} productData={product} />
        ))}
      </div>
    </div>
  );
}
