'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { MOBILE_NAV_ITEMS } from '@/constants/navigation';
import { NavigationLink } from './navigation-link';
import { useSafeNavigation } from '@/hooks/useSafeNavigation';

export function MobileNav() {
  const { isActive } = useSafeNavigation();

  return (
    <div className="bg-bg-100 desktop:hidden">
      <div className="px-6">
        <NavigationMenu className="h-12">
          <NavigationMenuList className="space-x-2">
            {MOBILE_NAV_ITEMS.map((item) => (
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
