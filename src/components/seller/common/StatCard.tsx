import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  isPositive,
  icon,
  className = '',
}: StatCardProps) {
  return (
    <Card className={cn('border-bg-300 bg-bg-100', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-text-200">{title}</p>
            <p className="text-2xl font-bold text-text-100">{value}</p>
            <div className="mt-1 flex items-center gap-1">
              <span className={cn('h-4 w-4', isPositive ? 'text-green-500' : 'text-red-500')}>
                {isPositive ? '↗' : '↘'}
              </span>
              <span
                className={cn(
                  'text-sm font-medium',
                  isPositive ? 'text-green-500' : 'text-red-500',
                )}
              >
                {change}
              </span>
            </div>
          </div>
          <div className="rounded-lg bg-primary-100 p-3">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}
