import { Link } from 'react-router-dom';
//import LogoPng from '@/assets/brand/logo.png';
import { HtmlHTMLAttributes, forwardRef } from 'react';
import { cn } from '@nextui-org/react';

interface LogoProps extends HtmlHTMLAttributes<HTMLAnchorElement> {
  size?: 'sm' | 'md' | 'lg';
  url: string;
}

const Logo = forwardRef<HTMLAnchorElement, LogoProps>(function Logo(props, ref) {
  const { size = 'md', className, url, ...rest } = props;

  return (
    <Link {...rest} ref={ref} to={url || '/'} className={cn(className)}>
      {/* <img
        id="logo"
        src={LogoPng}
        alt="brand-name"
        aria-label="home"
        className={`h-full object-contain ${size === 'sm' ? 'w-24' : size === 'md' ? 'w-32' : 'w-44'}`}
      /> */}
      {/*  <div className={`h-full text-center ${size === 'sm' ? 'w-32' : size === 'md' ? 'w-32' : 'w-44'}`}>
        <p className="font-bold text-inherit">E-COMMERCE</p>
      </div> */}
      <div>
        <p className="font-bold text-inherit">E-COMMERCE</p>
      </div>
    </Link>
  );
});

export default Logo;
