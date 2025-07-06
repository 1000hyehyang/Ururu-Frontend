import React from 'react';

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({ title, description, className = '' }: SectionHeaderProps) {
  return (
    <div className={`mb-8 flex flex-col items-center justify-center gap-2 ${className}`}>
      <h2 className="text-center text-xl font-semibold text-text-100 md:text-2xl">{title}</h2>
      {description && (
        <p className="mt-1 text-center text-sm text-text-200 md:text-base">{description}</p>
      )}
    </div>
  );
}
