'use client';

import React from 'react';
import { Separator } from '@/components/ui/separator';
import { SidebarItem } from '@/components/common';
import { FORM_STYLES } from '@/constants/form-styles';
import { myPageData } from '@/data/mypage';
import { useLogout } from '@/hooks/useAuth';

export function Sidebar() {
  const { navigationSections } = myPageData;
  const { handleLogout } = useLogout();

  // 로그아웃 핸들러
  const handleLogoutClick = async () => {
    await handleLogout();
  };

  // 아이템에 onClick 핸들러 추가
  const processedSections = navigationSections.map((section) => ({
    ...section,
    items: section.items.map((item) => {
      if (item.label === '로그아웃') {
        return { ...item, onClick: handleLogoutClick };
      }
      return item;
    }),
  }));

  return (
    <aside className="hidden w-[256px] flex-col gap-6 bg-bg-100 lg:flex">
      {processedSections.map((section, idx) => (
        <React.Fragment key={section.title}>
          <div className="flex w-full flex-col items-start gap-3">
            <div className="mb-1 text-base font-semibold text-text-100">{section.title}</div>
            {section.items.map((item) => (
              <SidebarItem key={item.label} item={item} className={FORM_STYLES.hover.bg200} />
            ))}
          </div>
          {idx < processedSections.length - 1 && <Separator className="my-2 bg-bg-300" />}
        </React.Fragment>
      ))}
    </aside>
  );
}
