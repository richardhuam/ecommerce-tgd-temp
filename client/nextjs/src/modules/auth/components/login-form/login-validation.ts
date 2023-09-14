import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please provide a valid email address')
    .min(6, 'Email must be at least 6 characters long')
    .max(100, 'Email cannot exceed 100 characters')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(18, 'Password cannot exceed 18 characters')
    .required('Password is required'),
});
