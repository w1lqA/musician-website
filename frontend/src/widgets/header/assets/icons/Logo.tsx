import type { ImgHTMLAttributes } from 'react';
import LogoImg from './1logo.png';
import clsx from 'clsx';

const Logo = ({ className, ...props }: ImgHTMLAttributes<HTMLImageElement>) => {
  return (
    <img
      src={LogoImg}
      alt="Logo"
      className={clsx(
        className,
        'brightness-0 invert w-full h-full object-contain min-w-24'
      )}
      {...props}
    />
  );
};

export default Logo;
