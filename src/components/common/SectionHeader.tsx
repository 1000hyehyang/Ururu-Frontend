import React from 'react';

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({ title, description, className = '' }: SectionHeaderProps) {
  return (
    <div className={`mb-2 ${className}`}>
      <h2 className="text-xl font-semibold text-text-100">{title}</h2>
      {description && <p className="mt-1 text-sm text-text-200">{description}</p>}
    </div>
  );
}
