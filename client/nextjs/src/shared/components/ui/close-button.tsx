import cn from 'classnames';
import { ButtonHTMLAttributes, forwardRef, MouseEventHandler } from 'react';

interface CloseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClose: MouseEventHandler<HTMLButtonElement>;
}

const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>((props, ref) => {
  const { onClose, className, ...rest } = props;
  return (
    <button {...rest} ref={ref} onClick={onClose} className={cn('font-semibold px-3 py-2 text-gray-500 text-18', className)}>
      ✕
    </button>
  );
});

CloseButton.displayName = 'CloseButton';

export default CloseButton;
