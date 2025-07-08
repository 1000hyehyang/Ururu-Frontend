import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FORM_STYLES } from '@/constants/form-styles';
import { X, Image as ImageIcon } from 'lucide-react';

interface Option {
  id: string;
  name: string;
  price: number;
  image: File | null;
  stock: number;
}

interface OptionListProps {
  options: Option[];
  onChange: (id: string, field: keyof Option, value: any) => void;
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
  option: Option;
  index: number;
  onChange: (id: string, field: keyof Option, value: any) => void;
  onRemove: (id: string) => void;
  onImageUpload: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <Card className={FORM_STYLES.card.option + ' mb-8'}>
      <CardContent className={FORM_STYLES.card.content + ' relative'}>
        {/* 옵션 번호 & 삭제 버튼 */}
        <div className="mb-4 flex items-center justify-between">
          <div className="w-full text-center text-xl font-medium">옵션 {index + 1}</div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onRemove(option.id)}
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
            onChange={(e) => onChange(option.id, 'name', e.target.value.slice(0, 20))}
            placeholder="EX) 07 킥로즈"
            maxLength={20}
            required
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
                onChange(option.id, 'price', Number(value));
              }}
              placeholder="10,000"
              required
              className={FORM_STYLES.input.base + ' ' + FORM_STYLES.input.focus}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-300">원</span>
          </div>
        </div>
        {/* 이미지 업로드 */}
        <div className="mb-4">
          <label className={FORM_STYLES.label.base}>
            옵션 이미지 <span className={FORM_STYLES.label.required}>*</span>
          </label>
          <div className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-bg-300 bg-bg-100 p-6 text-center">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id={`option-image-upload-${option.id}`}
              onChange={(e) => onImageUpload(option.id, e)}
            />
            <label
              htmlFor={`option-image-upload-${option.id}`}
              className="flex cursor-pointer flex-col items-center"
            >
              <ImageIcon className="mb-2 h-8 w-8 text-text-300" />
              <span className="text-sm text-text-300">대표 이미지를 업로드하세요</span>
            </label>
            {option.image && <div className="mt-2 text-xs text-text-200">{option.image.name}</div>}
          </div>
        </div>
        {/* 전성분 */}
        <div>
          <label className={FORM_STYLES.label.base}>
            전성분 <span className={FORM_STYLES.label.required}>*</span>
          </label>
          <Input
            value={option.stock || ''}
            onChange={(e) => onChange(option.id, 'stock', e.target.value)}
            placeholder="전성분을 표기해주세요"
            required
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
          key={option.id}
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
