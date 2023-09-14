import React, { Dispatch, SetStateAction } from 'react';

import { CountriesProps, countryList } from '@/shared/constants/countries';

import FormLabel from '../form-label';
import Select from '../select';

type CountriesSelectProps = {
  onChange: (...event: any[]) => void;
  setSelectedCountry: Dispatch<SetStateAction<CountriesProps>>;
  selectedCountry: CountriesProps;
};

export default function CountriesSelect({ onChange, selectedCountry, setSelectedCountry }: CountriesSelectProps) {
  const keyValue: keyof CountriesProps = 'name';
  const keyLabel: keyof CountriesProps = 'name';
  return (
    <>
      <FormLabel label="Country" required />
      <Select
        options={countryList}
        keyLabel={keyLabel}
        keyValue={keyValue}
        data={selectedCountry}
        onChange={e => {
          onChange(e);
          setSelectedCountry(e);
        }}
      />
    </>
  );
}
