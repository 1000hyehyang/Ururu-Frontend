'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { categoryItems } from '@/data/categories';

export function MainNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: '홈' },
    { href: '/ranking', label: '랭킹' },
    { href: '/short', label: '숏구' },
    { href: '/event', label: '이벤트' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div className="hidden bg-bg-100 desktop:block">
      <div className="container">
        <NavigationMenu className="h-12">
          <NavigationMenuList className="space-x-2">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-pretendard font-normal text-text-200 transition-all hover:bg-bg-200 hover:font-medium">
                카테고리
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-bg-100">
                <ul className="grid w-[600px] gap-3 p-4 md:w-[900px] md:grid-cols-3">
                  {categoryItems?.length > 0 ? (
                    categoryItems.map((item) => (
                      <li key={item.href} className="space-y-2">
                        <div className="font-pretendard px-3 pt-3 text-sm font-medium leading-none text-text-200">
                          {item.title}
                        </div>
                        <div className="space-y-1">
                          {item.subItems.map((subItem) => (
                            <NavigationMenuLink key={subItem.href} asChild>
                              <Link
                                href={subItem.href}
                                className="font-pretendard block rounded px-3 py-1 text-xs font-normal text-text-200 transition-all hover:bg-bg-200 hover:font-medium hover:text-text-200"
                              >
                                {subItem.title}
                              </Link>
                            </NavigationMenuLink>
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

            {navItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'font-pretendard font-normal text-text-200 transition-all hover:bg-bg-200 hover:font-medium',
                      isActive(item.href) && 'font-medium text-primary-300',
                    )}
                  >
                    {item.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
