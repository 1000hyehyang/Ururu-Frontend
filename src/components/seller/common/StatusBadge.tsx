import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  variant?: 'product' | 'order' | 'groupBuy';
  className?: string;
}

export function StatusBadge({ status, variant = 'product', className = '' }: StatusBadgeProps) {
  const getStatusConfig = (status: string, variant: string) => {
    if (variant === 'product') {
      switch (status) {
        case 'active':
          return {
            label: '진행중',
            className: 'bg-green-100 text-green-700',
          };
        case 'inactive':
          return {
            label: '비활성',
            className: 'bg-red-100 text-red-700',
          };
        case 'draft':
          return {
            label: '임시저장',
            className: 'bg-yellow-100 text-yellow-700',
          };
        default:
          return {
            label: '알 수 없음',
            className: 'bg-gray-100 text-gray-700',
          };
      }
    }

    if (variant === 'order') {
      switch (status) {
        case 'pending':
          return {
            label: '주문 대기',
            className: 'bg-yellow-100 text-yellow-700',
          };
        case 'confirmed':
          return {
            label: '주문 확정',
            className: 'bg-blue-100 text-blue-700',
          };
        case 'shipping':
          return {
            label: '배송중',
            className: 'bg-purple-100 text-purple-700',
          };
        case 'delivered':
          return {
            label: '배송 완료',
            className: 'bg-green-100 text-green-700',
          };
        case 'cancelled':
          return {
            label: '주문 취소',
            className: 'bg-red-100 text-red-700',
          };
        default:
          return {
            label: '알 수 없음',
            className: 'bg-gray-100 text-gray-700',
          };
      }
    }

    if (variant === 'groupBuy') {
      switch (status) {
        case 'active':
          return {
            label: '진행중',
            className: 'bg-green-100 text-green-700',
          };
        case 'paused':
          return {
            label: '일시정지',
            className: 'bg-yellow-100 text-yellow-700',
          };
        case 'completed':
          return {
            label: '완료',
            className: 'bg-blue-100 text-blue-700',
          };
        case 'draft':
          return {
            label: '임시저장',
            className: 'bg-gray-100 text-gray-700',
          };
        default:
          return {
            label: '알 수 없음',
            className: 'bg-gray-100 text-gray-700',
          };
      }
    }

    return {
      label: '알 수 없음',
      className: 'bg-gray-100 text-gray-700',
    };
  };

  const config = getStatusConfig(status, variant);

  return (
    <Badge
      className={cn(
        'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
        config.className,
        className,
      )}
    >
      {config.label}
    </Badge>
  );
}
