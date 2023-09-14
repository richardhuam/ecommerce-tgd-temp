import { Button, ButtonProps } from '@nextui-org/react';
import { Heart } from 'lucide-react';
import { forwardRef } from 'react';

const WishlistButton = forwardRef<HTMLButtonElement, ButtonProps>(function (props, ref) {
  return (
    <Button {...props} ref={ref} size="sm" isIconOnly color="danger" variant="light" aria-label="wishlist">
      <Heart />
    </Button>
  );
});

WishlistButton.displayName = 'WishlistButton';

export default WishlistButton;
