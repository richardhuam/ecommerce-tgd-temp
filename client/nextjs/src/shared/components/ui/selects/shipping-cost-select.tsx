import React, { Dispatch, SetStateAction } from 'react';

import { IShippingCosts } from '@/shared/models/product.model';

import FormLabel from '../form-label';
import Select from '../select';

type ShippingCostSelectProps = {
  onChange: (...event: any[]) => void;
  selectedShippingCost: IShippingCosts | null;
  setSelectedShippingCost: Dispatch<SetStateAction<IShippingCosts | null>>;
  options: IShippingCosts[];
};

export default function ShippingCostSelect({
  onChange,
  selectedShippingCost,
  setSelectedShippingCost,
  options = [],
}: ShippingCostSelectProps) {
  const keyValue: keyof IShippingCosts = 'shippingMethodWithPrice';
  const keyLabel: keyof IShippingCosts = 'shippingMethodWithPrice';
  return (
    <>
      <FormLabel label="Shipping Method" required />
      <Select
        options={options}
        keyLabel={keyLabel}
        keyValue={keyValue}
        data={selectedShippingCost}
        onChange={e => {
          onChange(e);
          setSelectedShippingCost(e);
        }}
      />
    </>
  );
}
