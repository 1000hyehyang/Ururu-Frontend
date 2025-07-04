import React from 'react';
import {
  LogOutIcon,
  UserXIcon,
  FileTextIcon,
  RefreshCwIcon,
  MessageSquareIcon,
  FileIcon,
  TruckIcon,
  PackageIcon,
} from 'lucide-react';

interface SidebarIconProps {
  iconName: string;
  className?: string;
}

export function SidebarIcon({ iconName, className = 'h-3 w-3 text-text-200' }: SidebarIconProps) {
  const iconMap: { [key: string]: React.ReactNode } = {
    PackageIcon: <PackageIcon className={className} />,
    RefreshCwIcon: <RefreshCwIcon className={className} />,
    PointIcon: (
      <div className="relative flex h-3 w-3 items-center justify-center rounded-md border border-solid border-text-200">
        <span className="text-[8px] font-bold text-text-200">P</span>
      </div>
    ),
    MessageSquareIcon: <MessageSquareIcon className={className} />,
    TruckIcon: <TruckIcon className={className} />,
    LogOutIcon: <LogOutIcon className={className} />,
    UserXIcon: <UserXIcon className={className} />,
    FileTextIcon: <FileTextIcon className={className} />,
    FileIcon: <FileIcon className={className} />,
  };

  return iconMap[iconName] || null;
}
