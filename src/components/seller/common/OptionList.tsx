import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FORM_STYLES } from '@/constants/form-styles';
import { X } from 'lucide-react';
import { ImageUploadField } from './ImageUploadField';
import type { ProductEditOption } from '@/types/product';

interface OptionListProps {
  options: ProductEditOption[];
  onChange: (id: string, field: keyof ProductEditOption, value: any) => void;
  onRemove: (id: string) => void;
  onImageUpload: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void;
}

function OptionCard({
  option,
  index,
  onChange,
  onRemove,
  onImageUpload,
}: {
  option: ProductEditOption;
  index: number;
  onChange: (id: string, field: keyof ProductEditOption, value: any) => void;
  onRemove: (id: string) => void;
  onImageUpload: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const optionId = option.id !== null ? String(option.id) : `new-${index}`;

  return (
    <Card className={FORM_STYLES.card.option + ' mb-8'}>
      <CardContent className={FORM_STYLES.card.content + ' relative p-4'}>
        {/* 옵션 번호 & 삭제 버튼 */}
        <div className="mb-4 flex items-center justify-between">
          <div className="w-full text-center text-xl font-medium">옵션 {index + 1}</div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onRemove(optionId)}
            className="absolute right-4 top-4"
            aria-label="옵션 삭제"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        {/* 옵션명 */}
        <div className="mb-4">
          <label className={FORM_STYLES.label.base}>
            옵션명 <span className={FORM_STYLES.label.required}>*</span>
          </label>
          <Input
            value={option.name}
            onChange={(e) => onChange(optionId, 'name', e.target.value.slice(0, 20))}
            placeholder="EX) 07 킥로즈"
            maxLength={20}
            className={FORM_STYLES.input.base + ' ' + FORM_STYLES.input.focus}
          />
          <div className="mt-1 text-right text-xs text-text-300">
            {(option.name || '').length}/20자
          </div>
        </div>
        {/* 가격 */}
        <div className="mb-4">
          <label className={FORM_STYLES.label.base}>
            기본 가격 <span className={FORM_STYLES.label.required}>*</span>
          </label>
          <div className="relative">
            <Input
              type="text"
              value={option.price ? option.price.toLocaleString() : ''}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                onChange(optionId, 'price', Number(value));
              }}
              placeholder="10,000"
              className={FORM_STYLES.input.base + ' ' + FORM_STYLES.input.focus}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-300">원</span>
          </div>
        </div>
        {/* 이미지 업로드 */}
        <div className="mb-4">
          <ImageUploadField
            label="옵션 이미지"
            required
            placeholder="대표 이미지를 업로드하세요"
            uploadedFiles={option.image ? [option.image] : []}
            existingImageUrl={option.imageUrl}
            onUpload={(e) => onImageUpload(optionId, e)}
            id={`option-image-upload-${optionId}`}
            variant="option"
          />
        </div>
        {/* 전성분 */}
        <div>
          <label className={FORM_STYLES.label.base}>
            전성분 <span className={FORM_STYLES.label.required}>*</span>
          </label>
          <Input
            value={option.fullIngredients || ''}
            onChange={(e) => onChange(optionId, 'fullIngredients', e.target.value)}
            placeholder="전성분을 표기해주세요"
            className={FORM_STYLES.input.base + ' ' + FORM_STYLES.input.focus}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export function OptionList({ options, onChange, onRemove, onImageUpload }: OptionListProps) {
  return (
    <div>
      {options.map((option, idx) => (
        <OptionCard
          key={option.id !== null ? String(option.id) : `new-${idx}`}
          option={option}
          index={idx}
          onChange={onChange}
          onRemove={onRemove}
          onImageUpload={onImageUpload}
        />
      ))}
    </div>
  );
}
