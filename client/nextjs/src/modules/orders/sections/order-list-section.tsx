import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BsCheck2Circle } from 'react-icons/bs';
import { SlClose } from 'react-icons/sl';

import { routes } from '@/config/routes';
import Alert from '@/shared/components/ui/alert';
import Paginate from '@/shared/components/ui/paginate';
import Paper from '@/shared/components/ui/paper';
import { PAYMENT_STATUS } from '@/shared/constants/order-status';
import { useGetOrders } from '@/shared/queries/order/order.query';
import { formatDate } from '@/shared/utils/formate-date';
import { truncateString } from '@/shared/utils/truncate-string';

type OrderListSectionProps = {};

export default function OrderListSection({}: OrderListSectionProps) {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const { data: orders, isError } = useGetOrders({ page });

  function handlePageChange(page: number) {
    setPage(page);
  }

  if (!orders?.ok || isError) {
    return <Alert variant="error" title="Something went wrong" message="It seems like it's a bit late to use this coupon" />;
  }

  if (orders.data.result.length === 0)
    return (
      <Alert
        isPermanent
        callToAction={{ label: 'Go Shopping', action: () => router.push(routes.home) }}
        variant="info"
        title="No orders registered"
        message="You don't have any order registered yet"
      />
    );

  return (
    <div>
      <Paper>
        <div className="overflow-auto">
          <table className="w-full">
            <thead className="border-b-1 border-gray-200">
              <tr>
                <th className="p-3">N°</th>
                <th className="p-3">Order ID</th>
                <th className="p-3">Products</th>
                <th className="p-3">Order Date</th>
                <th className="p-3">Payment Method</th>
                <th className="p-3">Order Status</th>
                <th className="p-3">Order Amount</th>
                <th className="p-3">Payment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y-1">
              {orders.data.result.map((order, index) => (
                <tr key={order._id} className="text-15 transition-all ease-in-out duration-300">
                  <td className="p-3 text-center whitespace-nowrap">{index + 1}</td>
                  <td className="p-3 text-center w-72 whitespace-nowrap">{order.orderId.toUpperCase()}</td>
                  <td className="p-3 text-center w-72 whitespace-nowrap">
                    <ul className="px-3">
                      {order.items.map(item => {
                        return (
                          <li key={item.product._id} className="list-disc">
                            <div className="gap-3 flex items-center justify-between">
                              <Link href={routes.productUrl(item.product)} className="hover:text-primary">
                                {truncateString(`${item.product.brand} ${item.product.name}`, 30)} x{item.quantity}
                              </Link>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                  <td className="p-3 w-72 text-center whitespace-nowrap">{formatDate(order.createdAt, 'MMMM DD, YYYY')}</td>
                  <td className="p-3 w-72 text-center whitespace-nowrap">{order.paymentMethod}</td>
                  <td className="p-3 w-72 text-center whitespace-nowrap">{order.orderStatus}</td>
                  <td className="p-3 font-medium text-end whitespace-nowrap">{order.totalPrice}</td>
                  <td className="p-3 w-72 text-center whitespace-nowrap">
                    {order.paymentStatus === PAYMENT_STATUS.PAID ? (
                      <span className="flex items-center justify-center gap-2">
                        <BsCheck2Circle className="text-green-800 text-20" />
                        Paid
                      </span>
                    ) : (
                      <a
                        href={order.stripePaymentDetails.url}
                        className="flex items-center transition-all ease-in-out duration-300 hover:text-red-600 w-full justify-center gap-2"
                      >
                        <SlClose className="text-red-600 text-20" />
                        Pay Now
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {orders.data.pagination && (
          <div className="mt-4 lg:mt-6">
            <Paginate onPageChange={handlePageChange} pagination={orders.data.pagination} />
          </div>
        )}
      </Paper>
    </div>
  );
}
