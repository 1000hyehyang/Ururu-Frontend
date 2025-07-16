'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { categoryItems } from '@/data/categories';
import { DESKTOP_NAV_ITEMS } from '@/constants/navigation';
import { NavigationLink } from './navigation-link';
import { useSafeNavigation } from '@/hooks/useSafeNavigation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useRef } from 'react';

export function MainNav() {
  const { isActive } = useSafeNavigation();
  const router = useRouter();
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="hidden bg-bg-100 desktop:block">
      <div className="container">
        <NavigationMenu className="h-12">
          <NavigationMenuList className="space-x-2">
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className="font-pretendard font-normal text-text-200 transition-all hover:bg-bg-200 hover:font-medium"
                ref={triggerRef}
              >
                카테고리
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-bg-100">
                <ul className="grid w-[600px] gap-3 p-4 md:w-[900px] md:grid-cols-3">
                  {categoryItems?.length > 0 ? (
                    categoryItems.map((item) => (
                      <li key={item.title} className="space-y-2">
                        <div className="font-pretendard px-3 pt-3 text-sm font-medium leading-none text-text-200">
                          {item.title}
                        </div>
                        <div className="space-y-1">
                          {item.subItems.map((subItem) => (
                            <div
                              key={subItem.title}
                              className="font-pretendard block cursor-pointer rounded px-3 py-1 text-xs font-normal text-text-200 transition-all hover:bg-bg-200 hover:font-medium hover:text-text-100"
                              onClick={() => {
                                router.push(`/category?sub=${encodeURIComponent(subItem.title)}`);
                                triggerRef.current?.click();
                              }}
                            >
                              {subItem.title}
                            </div>
                          ))}
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="p-4 text-sm text-text-200">카테고리를 불러올 수 없습니다.</li>
                  )}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {DESKTOP_NAV_ITEMS.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationLink item={item} isActive={isActive(item.href)} />
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
