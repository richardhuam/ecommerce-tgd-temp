import cn from 'classnames';
import React, { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react';

type TextAreaProps = DetailedHTMLProps<InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> & {
  label: string;
  error?: string;
  className?: string;
  required?: boolean;
  inputClassName?: string;
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  const { className, label, error, required = true, ...rest } = props;

  return (
    <>
      <label htmlFor={label} className="text-14 text-gray-600 space-y-0.5">
        {label} {required && <span className="text-red-400">*</span>}
        <textarea
          {...rest}
          ref={ref}
          rows={6}
          className={cn(
            'text-14 border-gray-300 text-gray-800 outline-primary rounded-md border-1 py-2.5 px-3.5 hover:border-black transition-all w-full resize-none',
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

TextArea.displayName = 'TextArea';

export default TextArea;
