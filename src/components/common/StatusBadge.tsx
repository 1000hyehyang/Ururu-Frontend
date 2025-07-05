import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'in_progress' | 'confirmed' | 'failed' | 'refund_pending' | 'COMPLETED' | 'REJECTED';
  className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const getStatusConfig = (status: StatusBadgeProps['status']) => {
    switch (status) {
      case 'in_progress':
        return {
          label: '공구 진행중',
          className: 'bg-primary-100 text-primary-300',
        };
      case 'confirmed':
        return {
          label: '공구 확정',
          className: 'bg-primary-100 text-primary-200 border border-primary-200',
        };
      case 'refund_pending':
        return {
          label: '환불 대기중',
          className: 'bg-bg-200 text-text-200',
        };
      case 'COMPLETED':
        return {
          label: '환불 완료',
          className: 'bg-primary-100 text-primary-200 border border-primary-200',
        };
      case 'REJECTED':
        return {
          label: '환불 거절',
          className: 'bg-bg-200 text-text-300',
        };
      default:
        return {
          label: '알 수 없음',
          className: 'bg-bg-200 text-text-200',
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-medium',
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  );
}
