import Link from 'next/link';
import { cn } from '@/lib/utils';
import { NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { NavItem } from '@/constants/navigation';

interface NavigationLinkProps {
  item: NavItem;
  isActive: boolean;
  className?: string;
}

export function NavigationLink({ item, isActive, className }: NavigationLinkProps) {
  return (
    <Link href={item.href} legacyBehavior passHref>
      <NavigationMenuLink
        className={cn(
          navigationMenuTriggerStyle(),
          'font-pretendard font-normal text-text-200 transition-all hover:bg-bg-200 hover:font-medium',
          isActive && 'font-medium text-primary-300',
          className,
        )}
      >
        {item.label}
      </NavigationMenuLink>
    </Link>
  );
}
