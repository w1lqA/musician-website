import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium';
  onClick?: () => void;
  className?: string;
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  className = ''
}: ButtonProps) => {
  const baseStyles = 'text-caption-medium text-center transition-opacity hover:opacity-90';

  const variantStyles = {
    primary: 'bg-accent-1 text-primary-white-600',
    secondary: 'bg-primary-white-600 text-primary-black-500',
  };

  const sizeStyles = {
    small: 'px-12 py-1.5 h-9',
    medium: 'px-12 py-1.5 h-9',
  };

  return (
    <button
    type='button'
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </button>
  );
};