import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { FORM_STYLES } from '@/constants/form-styles';

interface PageHeaderProps {
  title: string;
  description: string;
  actionButton?: {
    text: string;
    href: string;
    icon?: React.ReactNode;
  };
}

export function PageHeader({ title, description, actionButton }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-text-100">{title}</h1>
        <p className="text-sm text-text-200">{description}</p>
      </div>
      {actionButton && (
        <Link href={actionButton.href}>
          <Button className={FORM_STYLES.button.seller.primary}>
            {actionButton.icon || <Plus className="mr-2 h-4 w-4" />}
            {actionButton.text}
          </Button>
        </Link>
      )}
    </div>
  );
}
