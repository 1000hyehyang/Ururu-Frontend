import React from 'react';
import Link from 'next/link';
import { SidebarIcon } from './SidebarIcon';

interface SidebarItemProps {
  item: {
    icon: string;
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
}

export function SidebarItem({ item, className = '' }: SidebarItemProps) {
  const content = (
    <>
      <SidebarIcon iconName={item.icon} />
      <span>{item.label}</span>
    </>
  );

  if (item.href) {
    return (
      <Link
        href={item.href}
        className={`flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-text-200 hover:bg-bg-200 md:text-base ${className}`}
        aria-label={`${item.label} 메뉴로 이동`}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      className={`flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-text-200 hover:bg-bg-200 md:text-base ${className}`}
      role="button"
      tabIndex={0}
      aria-label={`${item.label} 메뉴로 이동`}
      onClick={item.onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          item.onClick?.();
        }
      }}
    >
      {content}
    </div>
  );
}