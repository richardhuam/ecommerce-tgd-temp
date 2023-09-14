import cn from 'classnames';
import { forwardRef, HtmlHTMLAttributes } from 'react';

interface NewProductBadgeProps extends HtmlHTMLAttributes<HTMLSpanElement> {}

const NewProductBadge = forwardRef<HTMLSpanElement, NewProductBadgeProps>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <span
      {...rest}
      ref={ref}
      className={cn(
        'bg-red-600 rounded-sm cursor-default text-white text-11 font-semibold px-2 py-1 inline-flex leading-none items-center justify-center',
        className,
      )}
    >
      NEW
    </span>
  );
});

NewProductBadge.displayName = 'NewProductBadge';

export default NewProductBadge;
