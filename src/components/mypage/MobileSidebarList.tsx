import React from 'react';
import { Separator } from '@/components/ui/separator';
import { SidebarItem } from '@/components/common';
import { myPageData } from '@/data/mypage';

export function MobileSidebarList() {
  const { navigationSections } = myPageData;

  return (
    <aside className="mt-4 flex w-full flex-col gap-6 bg-bg-100 lg:hidden">
      {navigationSections.map((section, idx) => (
        <React.Fragment key={section.title}>
          <div className="flex w-full flex-col items-start gap-3">
            <div className="mb-1 text-base font-semibold text-text-100">{section.title}</div>
            {section.items.map((item) => (
              <SidebarItem
                key={item.label}
                item={item}
              />
            ))}
          </div>
          {idx < navigationSections.length - 1 && <Separator className="my-2 bg-bg-300" />}
        </React.Fragment>
      ))}
    </aside>
  );
}
