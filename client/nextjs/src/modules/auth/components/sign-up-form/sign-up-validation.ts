import * as yup from 'yup';

export const signUpValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .trim()
    .matches(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/, 'Please enter a valid first name')
    .min(3, 'First name must be at least 3 characters long')
    .max(50, 'First name cannot exceed 50 characters')
    .required('First name is required'),
  lastName: yup
    .string()
    .trim()
    .matches(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/, 'Please enter a valid last name')
    .min(3, 'Last name must be at least 3 characters long')
    .max(50, 'Last name cannot exceed 50 characters')
    .required('Last name is required'),
  email: yup.string().email('Please enter a valid email address').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(18, 'Password cannot exceed 18 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
});
