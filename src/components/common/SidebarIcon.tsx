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
import { PointIcon } from './PointIcon';

interface SidebarIconProps {
  iconName: string;
  className?: string;
}

export function SidebarIcon({ iconName, className = 'h-3 w-3 text-text-200' }: SidebarIconProps) {
  const iconMap: { [key: string]: React.ReactNode } = {
    PackageIcon: <PackageIcon className={className} />,
    RefreshCwIcon: <RefreshCwIcon className={className} />,
    PointIcon: <PointIcon size="sm" className="mr-0" />,
    MessageSquareIcon: <MessageSquareIcon className={className} />,
    TruckIcon: <TruckIcon className={className} />,
    LogOutIcon: <LogOutIcon className={className} />,
    UserXIcon: <UserXIcon className={className} />,
    FileTextIcon: <FileTextIcon className={className} />,
    FileIcon: <FileIcon className={className} />,
  };

  return iconMap[iconName] || null;
}
