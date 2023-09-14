import { IProduct } from '@/shared/models/product.model';

import ProductCard from './product-card';

type ProductGridProps = {
  products: IProduct[];
};

export default function ProductGrid({ products = [] }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-3 place-items-center xs:place-items-stretch mx-auto sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-7xl">
      {products.map(item => (
        <ProductCard key={item._id} {...item} />
      ))}
    </div>
  );
}
