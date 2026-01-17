import { ReactNode } from 'react';

type CardVariant = 'default' | 'elevated' | 'bordered';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: CardVariant;
}

export function Card({ children, className = '', variant = 'default' }: CardProps) {
  const variants = {
    default: 'rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition-shadow',
    elevated: 'rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-md hover:shadow-lg transition-shadow',
    bordered: 'rounded-xl border-2 border-primary-200 dark:border-primary-900 bg-white dark:bg-neutral-900',
  };
  
  return (
    <div className={`${variants[variant]} p-6 ${className}`}>
      {children}
    </div>
  );
}
