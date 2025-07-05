import React from 'react';

interface PointIconProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PointIcon({ size = 'md', className = '' }: PointIconProps) {
  const sizeClasses = {
    sm: 'h-3 w-3 text-[8px]',
    md: 'h-10 w-10 text-xl',
    lg: 'h-12 w-12 text-2xl',
  };

  const borderClasses = {
    sm: 'border-text-200',
    md: 'border-primary-200',
    lg: 'border-primary-200',
  };

  const bgClasses = {
    sm: 'bg-transparent',
    md: 'bg-bg-100',
    lg: 'bg-bg-100',
  };

  const textClasses = {
    sm: 'text-text-200',
    md: 'text-primary-200',
    lg: 'text-primary-200',
  };

  return (
    <span
      className={`flex items-center justify-center rounded-full border ${sizeClasses[size]} ${borderClasses[size]} ${bgClasses[size]} font-semibold ${textClasses[size]} shadow-none ${className}`}
    >
      P
    </span>
  );
}
