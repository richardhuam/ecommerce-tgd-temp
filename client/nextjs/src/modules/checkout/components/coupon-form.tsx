import React from 'react';
import { useFormContext } from 'react-hook-form';

import Alert from '@/shared/components/ui/alert';
import Button from '@/shared/components/ui/button';
import Input from '@/shared/components/ui/input';
import { SpinnerWithText } from '@/shared/components/ui/spinners/spinner';
import { COUPON_STATUS } from '@/shared/constants';
import { useCheckout } from '@/shared/contexts/checkout.context';
import { ICheckoutFormParams } from '@/shared/models/checkout.model';

type CouponFormProps = {};

export default function CouponForm({}: CouponFormProps) {
  const {
    register,
    formState: { errors },
    resetField,
    getValues,
  } = useFormContext<ICheckoutFormParams>();

  const { validateOrderMutation, setCouponCode } = useCheckout();

  function handleGetCouponByCode() {
    const couponCode = getValues('order.coupon');
    if (!couponCode) return;

    setCouponCode(couponCode);
    resetField('order.coupon');
  }

  function removeCouponDiscount() {
    resetField('order.coupon');
    setCouponCode(undefined);
  }

  return (
    <div className="py-4 space-y-3">
      <div className="w-full">
        <Input
          required={false}
          label="coupon"
          hideLabel
          type="text"
          placeholder="Enter your code"
          error={errors.order?.coupon?.message}
          className="uppercase"
          maxLength={20}
          {...register('order.coupon')}
        />
      </div>
      {validateOrderMutation.isLoading && <SpinnerWithText text="Validating coupon..." />}
      {validateOrderMutation.data?.data.discount.status === COUPON_STATUS.INCORRECT_COUPON ? (
        <Alert
          variant="error"
          title={`Coupon ${validateOrderMutation.data.data.discount.code} was not applied`}
          message="Invalid coupon code"
        />
      ) : validateOrderMutation.data?.data.discount.status === COUPON_STATUS.EXPIRED ? (
        <Alert
          variant="error"
          title={`Coupon ${validateOrderMutation.data.data.discount.code} has expired`}
          message="It seems like it's a bit late to use this coupon"
        />
      ) : validateOrderMutation.data?.data.discount.status === COUPON_STATUS.MIN_AMOUNT_ERROR ? (
        <Alert
          variant="error"
          title={`Coupon ${validateOrderMutation.data.data.discount.code} was not used properly`}
          message={`The min order price to use this coupon is ${validateOrderMutation.data.data.discount.minOrderAmount}`}
        />
      ) : validateOrderMutation.data?.data.discount.status === COUPON_STATUS.IS_INACTIVE ? (
        <Alert
          variant="error"
          title={`Coupon ${validateOrderMutation.data.data.discount.code} is inactive`}
          message="It seems like the code you entered is not currently active"
        />
      ) : validateOrderMutation.data?.data.discount.status === COUPON_STATUS.APPLIED ? (
        <Alert
          variant="success"
          title={`Coupon ${validateOrderMutation.data.data.discount.code} applied`}
          message={`A discount of ${validateOrderMutation.data.data.discount.percent} has been applied`}
        />
      ) : null}
      {validateOrderMutation.data?.data.discount.status === COUPON_STATUS.APPLIED ? (
        <Button type="button" onClick={removeCouponDiscount} variant="outline" color="error" fullWidth>
          Remove Coupon
        </Button>
      ) : null}

      {/* For specific errors  */}
      {validateOrderMutation.isError ? (
        <Alert variant="error" title={`Coupon is wrong`} message="It looks like something went wrong" />
      ) : null}
      <Button
        onClick={handleGetCouponByCode}
        loading={validateOrderMutation.isLoading}
        disabled={validateOrderMutation.isLoading || validateOrderMutation.data?.data.discount.status === COUPON_STATUS.APPLIED}
        type="button"
        variant="outline"
        fullWidth
      >
        {validateOrderMutation.data?.data.discount.status === COUPON_STATUS.APPLIED ? 'Coupon Applied' : 'Apply Coupon'}
      </Button>
    </div>
  );
}
