import { myPageData } from '@/data/mypage';
import {
  RefreshCw,
  MessageSquare,
  Truck,
  LogOut,
  UserX,
  FileText,
  File,
  ChevronRight,
} from 'lucide-react';

const PointIcon = () => (
  <div className="relative flex h-5 w-5 items-center justify-center rounded-md border border-solid border-gray-400">
    <span className="text-[8px] font-bold text-gray-400">P</span>
  </div>
);

type IconComponent = React.ComponentType<{ className?: string }>;
type CustomIconComponent = () => JSX.Element;
type IconMapType = Record<string, IconComponent | CustomIconComponent>;

const iconMap: IconMapType = {
  RefreshCwIcon: RefreshCw,
  PointIcon,
  MessageSquareIcon: MessageSquare,
  TruckIcon: Truck,
  LogOutIcon: LogOut,
  UserXIcon: UserX,
  FileTextIcon: FileText,
  FileIcon: File,
};

export function ShoppingActivities() {
  const { navigationSections } = myPageData;

  return (
    <div className="divide-y divide-gray-100 rounded-2xl bg-white px-6 py-4 shadow-[0_4px_24px_0_rgba(0,0,0,0.06)]">
      {navigationSections.map((section, idx) => (
        <div key={section.title} className={idx !== 0 ? 'pt-4' : ''}>
          <div className="mb-2 text-sm font-semibold text-gray-900">{section.title}</div>
          <ul className="flex flex-col gap-1">
            {section.items.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <li key={item.label}>
                  <a
                    href="#"
                    className="group flex items-center rounded-lg px-2 py-2 transition-colors hover:bg-pink-50"
                  >
                    {item.icon === 'PointIcon' ? (
                      <PointIcon />
                    ) : (
                      <Icon className="mr-3 h-5 w-5 shrink-0 text-gray-400 group-hover:text-pink-400" />
                    )}
                    <span className="flex-1 text-sm font-medium text-gray-800">{item.label}</span>
                    <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-pink-400" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
