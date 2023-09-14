import { cn } from '@nextui-org/react';
import { HTMLProps, forwardRef } from 'react';

interface ContainerProps extends HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  extended?: boolean;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(function (props, ref) {
  const { children, className, extended = false } = props;
  return (
    <div
      ref={ref}
      className={cn(
        className,
        `${extended ? 'max-w-screen-2xl px-4 md:px-10 lg:px-16 mx-auto' : 'container px-4 md:px-10 lg:px-16'}`,
      )}
    >
      {children}
    </div>
  );
});

Container.displayName = 'Container';

export default Container;
