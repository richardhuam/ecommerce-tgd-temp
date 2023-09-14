import { cn } from '@nextui-org/react';
import { HtmlHTMLAttributes, forwardRef } from 'react';

interface TextDividerProps extends HtmlHTMLAttributes<HTMLDivElement> {
  text: string;
}
const TextDivider = forwardRef<HTMLDivElement, TextDividerProps>(function TextDivider(props, ref) {
  const { text = '', className, ...rest } = props;

  return (
    <div ref={ref} {...rest} className={cn('relative flex items-center', className)}>
      <div className="flex-grow border-t border-gray-400" />
      <span className="mx-2 flex-shrink text-sm text-12 text-gray-600 xs:mx-4 xs:text-13">{text}</span>
      <div className="flex-grow border-t border-gray-400" />
    </div>
  );
});

export default TextDivider;
