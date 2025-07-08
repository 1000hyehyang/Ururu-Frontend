import { Card, CardContent } from '@/components/ui/card';
import { FORM_STYLES } from '@/constants/form-styles';

interface EmptyPageProps {
  title?: string;
  className?: string;
}

export function EmptyPage({ title = '준비중이에요', className = '' }: EmptyPageProps) {
  return (
    <div className={`flex min-h-[400px] items-center justify-center ${className}`}>
      <Card className={FORM_STYLES.card.seller}>
        <CardContent className="p-12 text-center">
          <div className="mb-4 text-6xl">🚧</div>
          <h2 className="mb-2 text-xl font-semibold text-text-100">{title}</h2>
          <p className="text-sm text-text-200">곧 만나보실 수 있어요!</p>
        </CardContent>
      </Card>
    </div>
  );
}
