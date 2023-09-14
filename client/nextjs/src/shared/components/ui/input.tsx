import cn from 'classnames';
import React, { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react';

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  label: string;
  error?: string;
  className?: string;
  required?: boolean;
  inputClassName?: string;
  hideLabel?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, label, error, required = true, hideLabel = false, ...rest } = props;

  return (
    <>
      <label htmlFor={label} className="text-14 text-gray-600 space-y-0.5 w-full">
        {!hideLabel && (
          <>
            {label} {required && <span className="text-red-400">*</span>}
          </>
        )}
        <input
          ref={ref}
          {...rest}
          className={cn(
            'text-14 border-gray-300 text-gray-800 outline-primary rounded-md border-1 py-2.5 px-3.5 hover:border-black transition-all w-full disabled:hover:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed',
            className,
          )}
        />
      </label>
      {error && (
        <span role="alert" className="block pt-2 text-xs text-red-500">
          {error}
        </span>
      )}
    </>
  );
});

Input.displayName = 'Input';

export default Input;
