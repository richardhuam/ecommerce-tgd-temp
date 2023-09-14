import { CountriesProps } from '@/shared/constants/countries';
import { IPaymentMethod } from '@/shared/constants/payment-method';
import { IUser } from '@/shared/models/account.model';

interface GetCheckoutDefaultValuesProps {
  me: IUser;
  selectedCountry: CountriesProps;
  selectedPaymentMethod: IPaymentMethod;
}

export function getCheckoutDefaultValues({ me, selectedCountry, selectedPaymentMethod }: GetCheckoutDefaultValuesProps) {
  return {
    user: {
      firstName: me.firstName ?? '',
      lastName: me.lastName ?? '',
      email: me.email ?? '',
      phone: me?.phone ?? '',
      address: {
        country: {
          code: me.address?.country.code ?? selectedCountry.code,
          name: me.address?.country.name ?? selectedCountry.name,
        },
        city: me.address?.city ?? '',
        street: me.address?.street ?? '',
        state: me.address?.state ?? '',
        zip: me.address?.zip ?? '',
      },
    },
    order: {
      coupon: '',
      orderNotes: '',
      paymentMethod: selectedPaymentMethod.name,
    },
  };
}
