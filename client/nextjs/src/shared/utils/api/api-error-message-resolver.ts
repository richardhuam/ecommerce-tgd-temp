import { ENUM_API_ERRORS } from '@/shared/constants/api-errors';

export const errorMessageResolver = (error: any): string => {
  const message: string = error.response?.data?.message || error.response?.data?.data.error || error?.message || error.toString();

  switch (message) {
    //Auth
    case ENUM_API_ERRORS.USER_NOT_AUTHORIZED: {
      return 'User not authorized';
    }
    case ENUM_API_ERRORS.INVALID_CREDENTIALS: {
      return 'Oops! Wrong credentials entered.';
    }
    case ENUM_API_ERRORS.INVALID_LOGIN_METHOD: {
      return 'Oops! Invalid login method';
    }
    case ENUM_API_ERRORS.EMAIL_ALREADY_TAKEN: {
      return 'Sorry, That email is already registered.';
    }
    //User
    case ENUM_API_ERRORS.USER_NOT_FOUND: {
      return 'Sorry, No user found with that info';
    }
    //Orders
    case ENUM_API_ERRORS.ORDER_NOT_FOUND: {
      return 'Order not found';
    }
    default: {
      return 'Something went wrong :(';
    }
  }
};
