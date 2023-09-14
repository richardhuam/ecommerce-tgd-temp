import { Button, ButtonProps } from '@nextui-org/react';
import { forwardRef } from 'react';

const AddToCartButton = forwardRef<HTMLButtonElement, ButtonProps>(function (props, ref) {
  return (
    <Button fullWidth {...props} ref={ref} radius="sm" variant="flat" aria-label="add-to-cart">
      Add To Cart
    </Button>
  );
});

AddToCartButton.displayName = 'AddToCartButton';

export default AddToCartButton;
