import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import { routes } from '@/config/routes';
import AddToCartButton from '@/shared/components/cart/add-to-cart-button';
import Button from '@/shared/components/ui/button';
import Paginate from '@/shared/components/ui/paginate';
import { PRODUCT_STOCK_ALERT } from '@/shared/constants';
import { useWishlist } from '@/shared/contexts/wishlist.context';
import { IProduct } from '@/shared/models/product.model';
import { useGetWishlist, useToggleWishlist } from '@/shared/queries/wishlist/wishlist.query';
import { envService } from '@/shared/services/env/env.service';
import { getProductImageUrl } from '@/shared/utils/get-product-image-url';
import { truncateString } from '@/shared/utils/truncate-string';

type WishlistTableProps = {};

export default function WishlistTable({}: WishlistTableProps) {
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const { page, onPageChange } = useWishlist();

  const { data: wishlist } = useGetWishlist({ page });
  const { mutate: wishlistMutate, isLoading } = useToggleWishlist({ page, selectedProduct });

  function removeProductFromWishlist(product: IProduct) {
    setSelectedProduct(product);
    wishlistMutate(product, {
      onError: () => {
        setSelectedProduct(null);
      },
    });
  }

  return (
    <>
      <div className="overflow-auto">
        <table className="w-full">
          <thead className="border-b-1 border-gray-200">
            <tr>
              <th className="p-3" colSpan={2}>
                Product
              </th>
              <th className="p-3">SKU</th>
              <th className="p-3">Stock</th>
              <th className="p-3 text-end">Price</th>
              <th className="p-3" colSpan={2}>
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y-1">
            {wishlist?.data.result.map(product => (
              <tr key={product._id}>
                <td className="p-3 w-24 mx-auto flex items-center justify-center whitespace-nowrap">
                  <Link href={routes.productUrl(product)}>
                    <div className="cursor-pointer relative w-[90px] h-[90px] lg:w-24 lg:h-24">
                      <Image
                        src={getProductImageUrl({
                          productImage: product.images.main,
                          pathUrl: `${envService().productImageUrl}`,
                        })}
                        alt={`product-${product.name}`}
                        fill
                        priority
                        className="object-contain"
                      />
                    </div>
                  </Link>
                </td>
                <td className="p-3 w-72 whitespace-nowrap">
                  <Link href={routes.productUrl(product)}>
                    <p className="line-clamp-1 text-15">{truncateString(`${product.brand} ${product.name}`, 50)}</p>
                  </Link>
                </td>
                <td className="p-3 text-15 text-center whitespace-nowrap">{product.sku}</td>
                <td
                  className={`p-3 text-15 text-center whitespace-nowrap ${
                    product.inventory.availableStock < PRODUCT_STOCK_ALERT ? 'text-red-600' : ''
                  }`}
                >
                  {product.inventory.availableStock} Qty.
                </td>
                <td className="p-3 text-15 text-end whitespace-nowrap">{product.pricing.formattedDiscountedPrice}</td>
                <td className="p-3 w-52 whitespace-nowrap">
                  <AddToCartButton product={product} />
                </td>
                <td className="p-3 w-32 text-center whitespace-nowrap">
                  <Button
                    disabled={isLoading}
                    loading={isLoading}
                    variant="outline"
                    color="error"
                    onClick={() => removeProductFromWishlist(product)}
                  >
                    x Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {wishlist?.data.pagination && (
        <div className="mt-4 lg:mt-6">
          <Paginate onPageChange={onPageChange} pagination={wishlist.data.pagination} />
        </div>
      )}
    </>
  );
}
