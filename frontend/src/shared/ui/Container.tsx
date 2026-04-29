import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export const Container = ({ children, className = '' }: ContainerProps) => {
  return (
    <div className={`w-full max-w-[clamp(400px,100vw,1440px)] mx-auto px-8 desktop:px-0 ${className}`}>
      {children}
    </div>
  );
};