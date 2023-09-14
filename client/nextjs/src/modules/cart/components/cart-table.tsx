import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import { routes } from '@/config/routes';
import AddToCartButton from '@/shared/components/cart/add-to-cart-button';
import Button from '@/shared/components/ui/button';
import LocalPagination from '@/shared/components/ui/local-pagination';
import Paper from '@/shared/components/ui/paper';
import { useCart } from '@/shared/contexts/cart.context';
import { envService } from '@/shared/services/env/env.service';
import { formatCurrency } from '@/shared/utils/format-currency';
import { getProductImageUrl } from '@/shared/utils/get-product-image-url';
import { localPaginationUtility } from '@/shared/utils/local-pagination.utility';
import { truncateString } from '@/shared/utils/truncate-string';

type CartTableProps = {};

export default function CartTable({}: CartTableProps) {
  const { cartItems, removeItemFromCart, clearCart } = useCart();
  const [currentPage, setCurrentPage] = useState(1);
  const { currentItems, totalPages, itemsPerPage } = localPaginationUtility({ currentPage, items: cartItems, itemsPerPage: 6 });

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Paper className="w-full">
      <div className="overflow-auto">
        <table className="w-full">
          <thead className="border-b-1 border-gray-200">
            <tr>
              <th className="p-3" colSpan={2}>
                Product
              </th>
              <th className="p-3 text-end">Price</th>
              <th className="p-3" colSpan={2}>
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y-1">
            {currentItems.map(item => (
              <tr key={item.product._id}>
                <td className="p-3 w-24 mx-auto flex items-center justify-center whitespace-nowrap">
                  <Link href={routes.productUrl(item.product)}>
                    <div className="cursor-pointer relative w-[90px] h-[90px] lg:w-24 lg:h-24">
                      <Image
                        src={getProductImageUrl({
                          productImage: item.product.images.main,
                          pathUrl: `${envService().productImageUrl}`,
                        })}
                        alt={`product-${item.product.name}`}
                        fill
                        priority
                        className="object-contain"
                      />
                    </div>
                  </Link>
                </td>
                <td className="p-3 w-72 whitespace-nowrap">
                  <Link href={routes.productUrl(item.product)}>
                    <p className="line-clamp-1 text-15">{truncateString(`${item.product.brand} ${item.product.name}`, 35)}</p>
                  </Link>
                </td>
                <td className="p-3 text-15 text-end whitespace-nowrap">{formatCurrency(Number(item.product.pricing.discountedPrice))}</td>
                <td className="p-3 w-52 whitespace-nowrap">
                  <AddToCartButton product={item.product} />
                </td>
                <td className="p-3 w-32 text-center whitespace-nowrap">
                  <Button variant="outline" color="error" onClick={() => removeItemFromCart(item.product._id)}>
                    x Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {cartItems.length >= itemsPerPage && (
        <LocalPagination currentPage={currentPage} setCurrentPage={handlePageChange} totalPages={totalPages} />
      )}
      <div className="flex items-center justify-end">
        <Button onClick={() => clearCart()} variant="outline">
          Clear Cart
        </Button>
      </div>
    </Paper>
  );
}
