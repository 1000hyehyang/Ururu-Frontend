import React from 'react';
import { Separator } from '@/components/ui/separator';
import { SidebarItem } from '@/components/common';
import { FORM_STYLES } from '@/constants/form-styles';
import { myPageData } from '@/data/mypage';

export function Sidebar() {
  const { navigationSections } = myPageData;

  return (
    <aside className="hidden w-[256px] flex-col gap-6 bg-bg-100 lg:flex">
      {navigationSections.map((section, idx) => (
        <React.Fragment key={section.title}>
          <div className="flex w-full flex-col items-start gap-3">
            <div className="mb-1 text-base font-semibold text-text-100">{section.title}</div>
            {section.items.map((item) => (
              <SidebarItem key={item.label} item={item} className={FORM_STYLES.hover.bg200} />
            ))}
          </div>
          {idx < navigationSections.length - 1 && <Separator className="my-2 bg-bg-300" />}
        </React.Fragment>
      ))}
    </aside>
  );
}
