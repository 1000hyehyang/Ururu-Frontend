import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  buttonText: string;
  className?: string;
}

export function QuickActionCard({
  title,
  description,
  icon,
  href,
  buttonText,
  className = '',
}: QuickActionCardProps) {
  return (
    <Card className={cn('border-bg-300 bg-bg-100', className)}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-primary-100 p-3">{icon}</div>
          <div className="flex-1">
            <h3 className="mb-2 text-lg font-semibold text-text-100">{title}</h3>
            <p className="mb-4 text-sm text-text-200">{description}</p>
            <Link href={href}>
              <Button className="bg-primary-300 text-text-on hover:bg-primary-200">
                {buttonText}
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
