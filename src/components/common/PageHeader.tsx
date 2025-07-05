import React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({ title, description, className = '' }: PageHeaderProps) {
  return (
    <div className={`mb-6 ${className}`}>
      <h1 className="text-center text-2xl font-semibold text-text-100">{title}</h1>
      {description && <p className="mt-2 text-center text-sm text-text-200">{description}</p>}
    </div>
  );
}
