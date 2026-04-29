import type { ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  hoverVariant?: 'default' | 'primaryDefault' | 'primaryWhite' | 'primaryWhiteBorder' | 'secondaryDefault';
  size?: 'small' | 'medium';
  onClick?: () => void;
  className?: string;
  disabled?: boolean
  type?: 'submit' | 'button'
}

export const Button = ({
  children,
  variant = 'primary',
  hoverVariant = 'default',
  size = 'medium',
  onClick,
  className = '',
  disabled,
  type = 'button'
}: ButtonProps) => {
  const baseStyles = 'text-caption-medium text-center transition-all duration-300 outline-none';

  const variantStyles = {
    primary: 'bg-accent-1 text-primary-white-600 border border-transparent',
    secondary: 'bg-primary-white-600 text-primary-black-500 border border-transparent',
  };

  const hoverStyles = {
    default: 'hover:opacity-80',
    primaryDefault: 'hover:bg-accent-2',
    primaryWhite: 'hover:bg-primary-white-600 hover:border-primary-white-600 hover:text-primary-black-600',
    primaryWhiteBorder: 'hover:border-primary-white-600 hover:bg-primary-black-500 hover:text-primary-white-600',

    secondaryDefault: 'hover:bg-accent-1 hover:text-primary-white-600 hover:border hover:border-transparent'
  };

  const sizeStyles = {
    small: 'px-12 py-1.5 h-9',
    medium: 'px-12 py-1.5 h-9',
  };

  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        hoverStyles[hoverVariant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </button>
  );
};