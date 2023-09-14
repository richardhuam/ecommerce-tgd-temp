import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useMemo, useState } from 'react';

import { routes } from '@/config/routes';
import { isValidObjectId } from '@/shared/utils/validate-mongo-id';

import { ORDER_PAYMENT_METHOD } from '../constants';
import { CountriesProps, countryList } from '../constants/countries';
import { IPaymentMethod, paymentMethodsOptions } from '../constants/payment-method';
import { IUser } from '../models/account.model';
import { ICartItemWithProductId } from '../models/cart.model';
import { IShippingCosts } from '../models/product.model';
import { useCreateStripeSession } from '../queries/checkout/checkout.query';
import { useValidateOrder } from '../queries/order/order.query';
import { useGetShippingCosts } from '../queries/shipping-cost/shipping-cost.query';
import { useUpdateUserById } from '../queries/user/user.query';
import { ICreateStripeSessionApiParams, ICreateStripeSessionApiResponse } from '../services/checkout/checkout.service.types';
import { IValidateOrderApiParams, IValidateOrderApiResponse } from '../services/order/order.service.types';
import { IGetShippingCostsApiResponse } from '../services/shipping-cost/shipping-cost.service.types';
import { IUpdateUserByIdApiResponse } from '../services/user/user.service.types';
import { useAuth } from './auth.context';
import { useCart } from './cart.context';

interface IValidateOrderPayload {
  products: ICartItemWithProductId[];
  shippingCostId: string;
  couponCode?: string;
  paymentMethod: ORDER_PAYMENT_METHOD;
}

const CheckoutContext = createContext(
  {} as {
    selectedCountry: CountriesProps;
    setSelectedCountry: Dispatch<SetStateAction<CountriesProps>>;
    updateUserByIdMutation: UseMutationResult<IUpdateUserByIdApiResponse, unknown, Partial<IUser>, unknown>;
    validateOrderMutation: UseMutationResult<IValidateOrderApiResponse, unknown, IValidateOrderApiParams, unknown>;
    cartItemsWithIdFromLocalStorage: ICartItemWithProductId[];
    getShippingCostsQuery: UseQueryResult<IGetShippingCostsApiResponse, unknown>;
    selectedShippingCost: IShippingCosts | null;
    setSelectedShippingCost: Dispatch<SetStateAction<IShippingCosts | null>>;
    shippingCostOptions: IShippingCosts[];
    multipleProductsOrderPayload: IValidateOrderPayload;
    singleProductOrderPayload: IValidateOrderPayload;
    couponCode: string | undefined;
    setCouponCode: Dispatch<SetStateAction<string | undefined>>;
    createStripeSessionMutation: UseMutationResult<ICreateStripeSessionApiResponse, unknown, ICreateStripeSessionApiParams, unknown>;
    setSelectedPaymentMethod: Dispatch<SetStateAction<IPaymentMethod>>;
    selectedPaymentMethod: IPaymentMethod;
  },
);

interface CheckoutProviderProps {
  children: ReactNode;
}

export function CheckoutProvider({ children }: CheckoutProviderProps) {
  // top-level hooks
  const router = useRouter();
  const { me } = useAuth();
  const { cartItems } = useCart();

  const isCheckoutQueryParamsEmpty = Object.keys(router.query).length === 0;
  const isSingleProductIdValid = typeof router.query?.product === 'string' && isValidObjectId(router.query.product);
  // query hooks
  const updateUserByIdMutation = useUpdateUserById();
  const validateOrderMutation = useValidateOrder();
  const getShippingCostsQuery = useGetShippingCosts();
  const createStripeSessionMutation = useCreateStripeSession();

  // user country from db
  const countryFromUser = useMemo(
    () => countryList.filter(country => country.name === me.address?.country.name),
    [me.address?.country.name],
  );

  const shippingCostOptions = getShippingCostsQuery.data?.data ?? [];

  // local state hooks
  const [couponCode, setCouponCode] = useState<string | undefined>(undefined);
  const [selectedCountry, setSelectedCountry] = useState<CountriesProps>(countryFromUser[0] ?? countryList[0]);
  const [selectedShippingCost, setSelectedShippingCost] = useState<IShippingCosts | null>(shippingCostOptions?.[0] ?? null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<IPaymentMethod>(paymentMethodsOptions[0]);

  // formatting the cart data of localstorage to validate it with the product data from server
  const cartItemsWithIdFromLocalStorage: ICartItemWithProductId[] = useMemo(() => {
    return cartItems.map(item => {
      const productId = item.product._id;
      return { productId, quantity: item.quantity };
    });
  }, [cartItems]);

  const multipleProductsOrderPayload: IValidateOrderPayload = {
    products: cartItemsWithIdFromLocalStorage,
    shippingCostId: selectedShippingCost?._id ?? '',
    couponCode: couponCode,
    paymentMethod: selectedPaymentMethod?.name ?? undefined,
  };

  const singleProductOrderPayload: IValidateOrderPayload = {
    ...multipleProductsOrderPayload,
    products: [{ productId: `${router.query.product}`, quantity: 1 }],
  };

  useEffect(() => {
    if (singleProductOrderPayload.products.length === 0) return;

    if (isCheckoutQueryParamsEmpty) return;

    if (isSingleProductIdValid) {
      validateOrderMutation.mutate(singleProductOrderPayload);
    } else {
      router.push(routes.home);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleProductOrderPayload.products.length, multipleProductsOrderPayload.shippingCostId, couponCode]);

  useEffect(() => {
    if (multipleProductsOrderPayload.products.length === 0) return;

    if (isCheckoutQueryParamsEmpty) {
      validateOrderMutation.mutate(multipleProductsOrderPayload);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [multipleProductsOrderPayload.products.length, multipleProductsOrderPayload.shippingCostId, couponCode]);

  return (
    <CheckoutContext.Provider
      value={{
        selectedCountry,
        setSelectedCountry,
        updateUserByIdMutation,
        validateOrderMutation,
        cartItemsWithIdFromLocalStorage,
        getShippingCostsQuery,
        selectedShippingCost,
        setSelectedShippingCost,
        shippingCostOptions,
        multipleProductsOrderPayload,
        singleProductOrderPayload,
        couponCode,
        setCouponCode,
        createStripeSessionMutation,
        selectedPaymentMethod,
        setSelectedPaymentMethod,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export const useCheckout = () => useContext(CheckoutContext);
