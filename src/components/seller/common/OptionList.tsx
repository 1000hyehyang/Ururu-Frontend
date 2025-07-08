import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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

export function OptionList({ options, onChange, onRemove, onImageUpload }: OptionListProps) {
  return (
    <div className="space-y-4">
      {options.map((option) => (
        <div key={option.id} className="flex items-center gap-2 border-b border-bg-200 pb-4">
          <Input
            value={option.name}
            onChange={(e) => onChange(option.id, 'name', e.target.value)}
            placeholder="옵션명"
            className="w-1/4"
          />
          <Input
            type="number"
            value={option.price}
            onChange={(e) => onChange(option.id, 'price', Number(e.target.value))}
            placeholder="가격"
            className="w-1/4"
          />
          <Input
            type="number"
            value={option.stock}
            onChange={(e) => onChange(option.id, 'stock', Number(e.target.value))}
            placeholder="재고"
            className="w-1/4"
          />
          <label className="flex cursor-pointer items-center">
            <ImageIcon className="mr-1 h-5 w-5 text-text-300" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onImageUpload(option.id, e)}
            />
            <span className="text-xs text-text-300">
              {option.image ? option.image.name : '이미지'}
            </span>
          </label>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onRemove(option.id)}
            className="ml-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}
