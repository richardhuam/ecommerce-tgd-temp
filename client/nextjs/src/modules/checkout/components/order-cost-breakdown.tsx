import React from 'react';
import { BsCheckLg } from 'react-icons/bs';

import { COUPON_STATUS } from '@/shared/constants';
import { useCheckout } from '@/shared/contexts/checkout.context';

type OrderCostBreakDownProps = {};

export default function OrderCostBreakDown({}: OrderCostBreakDownProps) {
  const { validateOrderMutation } = useCheckout();

  return (
    <div className="py-5 space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-13 leading-5 text-gray-800">
            Shipping Cost{' '}
            {validateOrderMutation.data?.data.shipping.method && (
              <span className="text-13 uppercase">
                | {validateOrderMutation.data?.data.shipping.method} | {validateOrderMutation.data.data.totalItems} items
              </span>
            )}{' '}
          </p>
          {typeof validateOrderMutation.data?.data.shipping.isFree === 'boolean' && !validateOrderMutation.data?.data.shipping.isFree && (
            <p className="text-12 font-light text-gray-500">
              (Free shipping on orders over ${validateOrderMutation.data?.data.shipping.minOrderPriceForFreeShipping})
            </p>
          )}
        </div>
        <p className="text-14 text-gray-800 ml-4 font-medium">
          {validateOrderMutation.data?.data.shipping.isFree ? (
            <span className="text-green-600 text-14">Free</span>
          ) : (
            validateOrderMutation.data?.data.shipping.totalAmount
          )}
        </p>
      </div>
      {/*  <div className="flex items-center justify-between">
        <div>
          <p className="text-13 leading-5 text-gray-800">Tax ({`${validateOrderMutation.data?.data.taxes.percent}`})</p>
        </div>
        <p className="text-14 text-gray-800 ml-4 font-medium">{validateOrderMutation.data?.data.taxes.totalAmount}</p>
      </div> */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-14 leading-5 text-gray-800">
            Discount{' '}
            {validateOrderMutation.data?.data.discount.status === COUPON_STATUS.APPLIED ? (
              <span>
                {validateOrderMutation.data.data.discount.percent
                  ? `(-${validateOrderMutation.data.data.discount.percent})`
                  : `(-${validateOrderMutation.data.data.discount.totalAmount})`}
              </span>
            ) : null}
          </p>
        </div>
        <p className="text-14 text-gray-800 ml-4 font-medium">
          {validateOrderMutation.data?.data.discount.status === COUPON_STATUS.APPLIED ? '-' : null}{' '}
          {validateOrderMutation.data?.data.discount.totalAmount}
        </p>
      </div>
      {validateOrderMutation.data?.data.discount.status === COUPON_STATUS.APPLIED ? (
        <div>
          {validateOrderMutation.data.data.discount.percent ? (
            <div className="text-13 flex items-center justify-start gap-1 text-primary-800 font-medium">
              <BsCheckLg />
              {validateOrderMutation.data.data.discount.percent} discount coupon applied!
            </div>
          ) : (
            <div className="text-13 flex items-center justify-start gap-1 text-primary-800 font-medium">
              <BsCheckLg /> -{validateOrderMutation.data.data.discount.totalAmount} discount applied!
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
