import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import Input from '@/shared/components/ui/input';
import Paper from '@/shared/components/ui/paper';
import PaymentsMethodRadioGroup from '@/shared/components/ui/radio-groups/payment-method-radio-group';
import CountriesSelect from '@/shared/components/ui/selects/countries-select';
import ShippingCostSelect from '@/shared/components/ui/selects/shipping-cost-select';
import TextArea from '@/shared/components/ui/text-area';
import { useCheckout } from '@/shared/contexts/checkout.context';
import { ICheckoutFormParams } from '@/shared/models/checkout.model';

type BillingDetailsFormProps = {};

export default function BillingDetailsForm({}: BillingDetailsFormProps) {
  const {
    selectedCountry,
    setSelectedCountry,
    shippingCostOptions,
    selectedShippingCost,
    setSelectedShippingCost,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
  } = useCheckout();
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<ICheckoutFormParams>();

  return (
    <Paper>
      <h2 className="font-semibold text-20 mb-4">Personal Information</h2>
      <div className="w-full space-y-4">
        <div className="flex gap-4 sm:gap-2 md:gap-6 flex-col sm:flex-row w-full">
          <div className="w-full">
            <Input
              label="First Name"
              type="text"
              placeholder="John"
              error={errors.user?.firstName?.message}
              {...register('user.firstName')}
            />
          </div>
          <div className="w-full">
            <Input
              label="Last Name"
              type="text"
              placeholder="Smith"
              error={errors.user?.lastName?.message}
              {...register('user.lastName')}
            />
          </div>
        </div>
        <div className="flex gap-4 sm:gap-2 md:gap-6 flex-col sm:flex-row w-full">
          <div className="w-full">
            <Input
              label="Email"
              type="email"
              placeholder="john@gmail.com"
              disabled
              error={errors.user?.email?.message}
              {...register('user.email')}
            />
          </div>
          <div className="w-full">
            <Input
              label="Phone"
              type="text"
              placeholder="+1 8393 9384 4441"
              error={errors.user?.phone?.message}
              {...register('user.phone')}
            />
          </div>
        </div>
        <h2 className="font-semibold text-20 mb-4">Address</h2>
        <div className="flex gap-4 sm:gap-2 md:gap-6 flex-col sm:flex-row w-full">
          <div className="w-full">
            <Input
              label="Street"
              type="text"
              placeholder="Street"
              error={errors.user?.address?.street?.message}
              {...register('user.address.street')}
            />
          </div>
          <div className="w-full">
            <Input
              label="City"
              type="text"
              placeholder="City"
              error={errors.user?.address?.city?.message}
              {...register('user.address.city')}
            />
          </div>
        </div>
        <div className="flex gap-4 sm:gap-2 md:gap-6 flex-col sm:flex-row w-full">
          <div className="w-full">
            <Input
              label="State"
              type="text"
              placeholder="State"
              error={errors.user?.address?.state?.message}
              {...register('user.address.state')}
            />
          </div>
          <div className="w-full">
            <Input
              label="Zip Code"
              type="text"
              placeholder="Zip Code"
              error={errors.user?.address?.zip?.message}
              {...register('user.address.zip')}
            />
          </div>
        </div>
        <div className="flex gap-4 sm:gap-2 md:gap-6 flex-col sm:flex-row w-full">
          <div className="w-full">
            <Controller
              name="user.address.country"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange } }) => {
                return <CountriesSelect onChange={onChange} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />;
              }}
            />
          </div>
        </div>
        <h2 className="font-semibold text-20 mb-4">Shipping</h2>
        <div className="flex gap-4 sm:gap-2 md:gap-6 flex-col sm:flex-row w-full">
          <div className="w-full">
            <Controller
              name="order.shippingCost"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange } }) => {
                return (
                  <ShippingCostSelect
                    options={shippingCostOptions}
                    onChange={onChange}
                    selectedShippingCost={selectedShippingCost}
                    setSelectedShippingCost={setSelectedShippingCost}
                  />
                );
              }}
            />
          </div>
        </div>
        <h2 className="font-semibold text-20 mb-4">Payment Method</h2>
        <div className="flex gap-4 sm:gap-2 md:gap-6 flex-col sm:flex-row w-full">
          <div className="w-full">
            <Controller
              name="order.paymentMethod"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange } }) => {
                return (
                  <PaymentsMethodRadioGroup
                    onChange={onChange}
                    selectedPaymentMethod={selectedPaymentMethod}
                    setSelectedPaymentMethod={setSelectedPaymentMethod}
                  />
                );
              }}
            />
          </div>
        </div>
        <div>
          <TextArea
            label="Order Notes (optional)"
            type="text"
            required={false}
            placeholder="Notes about your order, e.g. special notes for delivery"
            error={errors.order?.orderNotes?.message}
            {...register('order.orderNotes')}
          />
        </div>
      </div>
    </Paper>
  );
}
