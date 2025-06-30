import React from 'react';
import {
  LogOutIcon,
  UserXIcon,
  FileTextIcon,
  RefreshCwIcon,
  MessageSquareIcon,
  FileIcon,
  TruckIcon,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { myPageData } from '@/data/mypage';

// 아이콘 매핑 함수
const getIcon = (iconName: string) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    RefreshCwIcon: <RefreshCwIcon className="h-3 w-3 text-text-200" />,
    PointIcon: (
      <div className="relative flex h-3 w-3 items-center justify-center rounded-md border border-solid border-text-200">
        <span className="text-[8px] font-bold text-text-200">P</span>
      </div>
    ),
    MessageSquareIcon: <MessageSquareIcon className="h-3 w-3 text-text-200" />,
    TruckIcon: <TruckIcon className="h-3 w-3 text-text-200" />,
    LogOutIcon: <LogOutIcon className="h-3 w-3 text-text-200" />,
    UserXIcon: <UserXIcon className="h-3 w-3 text-text-200" />,
    FileTextIcon: <FileTextIcon className="h-3 w-3 text-text-200" />,
    FileIcon: <FileIcon className="h-3 w-3 text-text-200" />,
  };
  return iconMap[iconName] || null;
};

export function MobileSidebarList() {
  const { navigationSections } = myPageData;

  return (
    <aside className="mt-4 flex w-full flex-col gap-6 bg-bg-100 lg:hidden">
      {navigationSections.map((section, idx) => (
        <React.Fragment key={section.title}>
          <div className="flex w-full flex-col items-start gap-3">
            <div className="mb-1 text-base font-semibold text-text-100">{section.title}</div>
            {section.items.map((item) => (
              <div
                key={item.label}
                className="flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-text-200 hover:bg-bg-300 md:text-base"
                role="button"
                tabIndex={0}
                aria-label={`${item.label} 메뉴로 이동`}
              >
                {getIcon(item.icon)}
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          {idx < navigationSections.length - 1 && <Separator className="my-2 bg-bg-300" />}
        </React.Fragment>
      ))}
    </aside>
  );
}
