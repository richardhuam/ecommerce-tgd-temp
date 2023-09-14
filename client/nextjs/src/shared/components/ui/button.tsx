import cn from 'classnames';
import React, { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large';
  variant?: 'normal' | 'outline' | 'custom';
  rounded?: boolean;
  active?: boolean;
  responsive?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  color?: 'primary' | 'secondary' | 'error' | 'gray';
}

const classes = {
  root: 'font-medium inline-flex items-center justify-center flex-shrink-0 leading-none outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow',
  //normal: 'bg-primary hover:bg-primary-light border-transparent text-white ',
  outline: 'border-primary bg-transparent border text-primary hover:text-primary-600 hover:border-primary-600',
  custom: 'border border-transparent',
  loading: 'h-4 w-4 ms-2 rounded-full border-2 border-transparent border-t-2 animate-spin',
  disabled: 'border border-primary-500 bg-primary-500 border-primary-500 text-gray-100 cursor-not-allowed',
  disabledOutline: 'border bg-[#EEF1F4] border-[#D4D8DD] text-gray-400 cursor-not-allowed',
  small: 'px-3 py-0 h-[34px] text-13',
  medium: 'px-3.5 py-0 h-[38px] text-14',
  large: 'px-4 py-0 h-12 text-16',
  fullWidth: 'w-full',
  rounded: 'rounded-full',
  notRounded: 'rounded-[4px]',
  /* New */
  primaryColor: 'bg-primary hover:bg-primary-600 border-transparent text-white',
  primaryColorOutline: 'border-primary bg-transparent border text-primary hover:text-primary-600 hover:border-primary-600',
  primaryColorDisabled: 'bg-primary-500 border border-primary-500 text-gray-100 cursor-not-allowed',

  secondaryColor: 'bg-secondary hover:bg-secondary-600 border-transparent text-white',
  secondaryColorOutline: 'border-secondary bg-transparent border text-secondary hover:text-secondary-600 hover:border-secondary-600',
  secondaryColorDisabled: 'bg-secondary-500 border border-secondary-500 text-gray-100 cursor-not-allowed',

  grayColor: 'bg-gray-500 hover:bg-gray-600 border-transparent text-white',
  grayColorOutline: 'border-gray-200 bg-transparent border text-gray-500 hover:text-gray-600 hover:border-gray-300',
  grayColorDisabled: 'bg-gray-500 border border-gray-500 text-gray-100 cursor-not-allowed',

  errorColor: 'bg-red-400 hover:bg-red-300 border-transparent text-white',
  errorColorOutline: 'border-red-400 bg-transparent border text-red-400 hover:text-red-500 hover:border-red-500',
  errorColorDisabled: 'bg-red-200 border border-red-200 text-gray-100 cursor-not-allowed',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    className,
    size = 'medium',
    children,
    variant = 'normal',
    active,
    rounded = false,
    disabled = false,
    loading = false,
    fullWidth,
    color = 'primary',
    ...rest
  } = props;

  return (
    <button
      {...rest}
      aria-pressed={active}
      data-variant={variant}
      disabled={disabled}
      ref={ref}
      className={cn(
        classes.root,
        {
          [classes.primaryColor]: !disabled && variant === 'normal' && color === 'primary',
          [classes.primaryColorDisabled]: disabled && variant === 'normal' && color === 'primary',
          [classes.primaryColorOutline]: !disabled && variant === 'outline' && color === 'primary',

          [classes.secondaryColor]: !disabled && variant === 'normal' && color === 'secondary',
          [classes.secondaryColorDisabled]: disabled && variant === 'normal' && color === 'secondary',
          [classes.secondaryColorOutline]: !disabled && variant === 'outline' && color === 'secondary',

          [classes.grayColor]: !disabled && variant === 'normal' && color === 'gray',
          [classes.grayColorDisabled]: disabled && variant === 'normal' && color === 'gray',
          [classes.grayColorOutline]: !disabled && variant === 'outline' && color === 'gray',

          [classes.errorColor]: !disabled && variant === 'normal' && color === 'error',
          [classes.errorColorDisabled]: disabled && variant === 'normal' && color === 'error',
          [classes.errorColorOutline]: !disabled && variant === 'outline' && color === 'error',

          [classes.disabledOutline]: disabled && variant === 'outline',
          [classes.small]: size === 'small',
          [classes.medium]: size === 'medium',
          [classes.large]: size === 'large',
          [classes.fullWidth]: fullWidth,
          [classes.rounded]: rounded,
          [classes.notRounded]: !rounded,
        },
        className,
      )}
    >
      {children}
      {loading && (
        <span
          className={classes.loading}
          style={{
            borderTopColor: variant === 'outline' ? 'currentColor' : '#ffffff',
          }}
        />
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
