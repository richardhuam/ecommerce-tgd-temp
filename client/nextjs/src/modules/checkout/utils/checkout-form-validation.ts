import * as Yup from 'yup';

import { ORDER_PAYMENT_METHOD } from '@/shared/constants';
import { ICheckoutFormParams } from '@/shared/models/checkout.model';

export const checkoutValidation = Yup.object().shape({
  user: Yup.object().shape({
    firstName: Yup.string()
      .min(3, 'First Name must be at least 3 characters long')
      .max(50, 'First Name must not exceed 50 characters')
      .matches(/^[A-Za-z]*$/, 'First Name should contain only letters')
      .required('First Name is required'),
    lastName: Yup.string()
      .min(3, 'Last Name must be at least 3 characters long')
      .max(50, 'Last Name must not exceed 50 characters')
      .matches(/^[A-Za-z]*$/, 'Last Name should contain only letters')
      .required('Last Name is required'),
    email: Yup.string().email('Please enter a valid email address').required('Email is required'),
    phone: Yup.string()
      .min(6, 'Phone number must be at least 6 characters long')
      .max(20, 'Phone number must not exceed 20 characters')
      .matches(/^\d+$/, 'Please enter a valid phone number (only numbers allowed)')
      .required('Phone number is required'),
    address: Yup.object().shape({
      street: Yup.string()
        .min(6, 'Street address must be at least 6 characters long')
        .max(80, 'Street address must not exceed 80 characters')
        .required('Street address is required'),
      city: Yup.string()
        .min(3, 'City must be at least 3 characters long')
        .max(30, 'City must not exceed 30 characters')
        .matches(/^[A-Za-z ]*$/, 'City should contain only letters')
        .required('City is required'),
      state: Yup.string()
        .min(2, 'State must be at least 2 characters long')
        .max(30, 'State must not exceed 30 characters')
        .matches(/^[A-Za-z ]*$/, 'State should contain only letters')
        .required('State is required'),
      country: Yup.object<ICheckoutFormParams['user']['address']['country']>().shape({
        code: Yup.string()
          .min(2, 'Country code must be at least 2 characters long')
          .max(10, 'Country code must not exceed 10 characters')
          .required('Country code is required'),
        name: Yup.string()
          .min(3, 'Country name must be at least 3 characters long')
          .max(50, 'Country name must not exceed 50 characters')
          .required('Country name is required'),
      }),
      zip: Yup.string()
        .min(3, 'Zip code must be at least 3 characters long')
        .max(30, 'Zip code must not exceed 30 characters')
        .matches(/^\d+$/, 'Zip code should contain only numbers')
        .required('Zip code is required'),
    }),
  }),
  order: Yup.object().shape({
    coupon: Yup.string().optional(),
    orderNote: Yup.string().optional(),
    paymentMethod: Yup.string().oneOf(Object.values(ORDER_PAYMENT_METHOD), 'Invalid payment method').required('Payment method is required'),
  }),
});
