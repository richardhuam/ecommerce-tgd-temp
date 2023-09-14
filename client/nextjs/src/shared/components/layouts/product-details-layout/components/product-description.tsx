import React from 'react';

import { IProduct } from '@/shared/models/product.model';

type ProductDescriptionProps = {
  product: IProduct;
};

export default function ProductDescription({ product }: ProductDescriptionProps) {
  return (
    <div>
      <h2 className="text-18 font-medium mb-1">Description:</h2>
      <p className="text-14 text-gray-600">{product.description}</p>
    </div>
  );
}
