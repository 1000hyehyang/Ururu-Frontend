import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormField } from '@/components/form/FormField';
import { X } from 'lucide-react';
import { FORM_STYLES } from '@/constants/form-styles';

interface DiscountTier {
  id: string;
  minParticipants: number;
  discountRate: number;
}

interface DiscountTierCardProps {
  tier: DiscountTier;
  index: number;
  onRemove: (tierId: string) => void;
  onUpdate: (tierId: string, field: keyof DiscountTier, value: number) => void;
}

export function DiscountTierCard({ tier, index, onRemove, onUpdate }: DiscountTierCardProps) {
  return (
    <div className="relative rounded-2xl border border-bg-300 bg-bg-100 p-6">
      <div className="absolute right-4 top-4">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onRemove(tier.id)}
          className="h-8 w-8 text-text-300 hover:bg-bg-200"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <h3 className="mb-4 text-lg font-semibold text-text-100">할인 단계 {index + 1}</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField label="최소 참여 인원" required>
          <div className="relative">
            <Input
              type="text"
              inputMode="numeric"
              value={tier.minParticipants || ''}
              onChange={(e) => {
                // 숫자만 허용하고 앞의 0 제거
                const value = e.target.value.replace(/[^0-9]/g, '');
                const numValue = value === '' ? 0 : parseInt(value, 10);
                // 9,999,999 제한 적용
                const limitedValue = Math.min(numValue, 9999999);
                onUpdate(tier.id, 'minParticipants', limitedValue);
              }}
              placeholder="100"
              className={FORM_STYLES.input.base + ' pr-12'}
              required
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-300">명</span>
          </div>
        </FormField>
        <FormField label="할인율" required>
          <div className="relative">
            <Input
              type="text"
              inputMode="numeric"
              value={tier.discountRate || ''}
              onChange={(e) => {
                // 숫자만 허용하고 앞의 0 제거, 최대값 100 제한
                const value = e.target.value.replace(/[^0-9]/g, '');
                const numValue = value === '' ? 0 : parseInt(value, 10);
                const limitedValue = Math.min(numValue, 100);
                onUpdate(tier.id, 'discountRate', limitedValue);
              }}
              placeholder="10"
              className={FORM_STYLES.input.base + ' pr-8'}
              required
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-300">%</span>
          </div>
        </FormField>
      </div>
    </div>
  );
}
