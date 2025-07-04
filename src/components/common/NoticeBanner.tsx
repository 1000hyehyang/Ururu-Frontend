import React from 'react';
import Image from 'next/image';

interface NoticeBannerProps {
  message: string;
  className?: string;
}

export function NoticeBanner({ message, className = '' }: NoticeBannerProps) {
  return (
    <div className={`mb-6 flex items-start gap-3 rounded-lg bg-bg-100 p-6 shadow-sm ${className}`}>
      <Image
        src="/ururu-gradient.svg"
        alt="우르르"
        width={24}
        height={24}
        className="h-6 w-6 flex-shrink-0"
      />
      <div className="flex-1">
        <p className="text-sm font-medium text-text-200">{message}</p>
      </div>
    </div>
  );
}
