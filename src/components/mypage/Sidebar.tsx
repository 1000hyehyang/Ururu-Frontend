'use client';

import React from 'react';
import { Separator } from '@/components/ui/separator';
import { SidebarItem } from '@/components/common';
import { FORM_STYLES } from '@/constants/form-styles';
import { myPageData } from '@/data/mypage';
import { useLogout } from '@/hooks/useLogout';

export function Sidebar() {
  const { navigationSections } = myPageData;
  const { handleLogout } = useLogout();

  const handleItemClick = (item: any) => {
    if (item.label === '로그아웃') {
      handleLogout();
    }
    // 다른 메뉴 아이템들은 href가 있으면 Link로 처리되거나 별도 핸들러 필요
  };

  return (
    <aside className="hidden w-[256px] flex-col gap-6 bg-bg-100 lg:flex">
      {navigationSections.map((section, idx) => (
        <React.Fragment key={section.title}>
          <div className="flex w-full flex-col items-start gap-3">
            <div className="mb-1 text-base font-semibold text-text-100">{section.title}</div>
            {section.items.map((item) => (
              <SidebarItem
                key={item.label}
                item={item}
                className={FORM_STYLES.hover.bg200}
                onClick={() => handleItemClick(item)}
              />
            ))}
          </div>
          {idx < navigationSections.length - 1 && <Separator className="my-2 bg-bg-300" />}
        </React.Fragment>
      ))}
    </aside>
  );
}
