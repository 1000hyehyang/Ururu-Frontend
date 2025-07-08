'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { FormField } from '@/components/form/FormField';
import { FORM_STYLES } from '@/constants/form-styles';
import { MOCK_PRODUCTS } from '@/data/seller';
import { Upload, Plus, X, Image as ImageIcon, CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import Image from 'next/image';
import { useFormArray } from '@/hooks/seller/useFormArray';
import { OptionList } from './common/OptionList';
import { SectionHeader } from './common/SectionHeader';

interface DiscountTier {
  id: string;
  minParticipants: number;
  discountRate: number;
}

interface GroupBuyProduct {
  id: string;
  productId: string;
  selectedOptions: string[];
  maxQuantityPerPerson: number;
}

interface GroupBuyFormData {
  products: GroupBuyProduct[];
  title: string;
  description: string;
  mainImage: File | null;
  startDate: Date | undefined;
  endDate: Date | undefined;
  detailImages: File[];
  discountTiers: DiscountTier[];
}

// OptionSelector: 공구 등록에서 옵션 선택만 하는 체크박스 UI
function OptionSelector({
  options,
  selectedOptions,
  onToggle,
}: {
  options: readonly string[];
  selectedOptions: string[];
  onToggle: (option: string) => void;
}) {
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <label key={option} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selectedOptions.includes(option)}
            onChange={() => onToggle(option)}
            className={FORM_STYLES.checkbox.base}
          />
          <span className="text-sm text-text-100">{option}</span>
        </label>
      ))}
    </div>
  );
}

export function GroupBuyRegistration() {
  // 상품 1개만 선택
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [maxQuantityPerPerson, setMaxQuantityPerPerson] = useState(1);
  const [formData, setFormData] = useState<Omit<GroupBuyFormData, 'products' | 'discountTiers'>>({
    title: '',
    description: '',
    mainImage: null,
    startDate: undefined,
    endDate: undefined,
    detailImages: [],
  });
  const [discountTiers, setDiscountTiers] = useState<DiscountTier[]>([]);

  const selectedProduct = MOCK_PRODUCTS.find((p) => p.id === selectedProductId);

  const handleOptionToggle = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option],
    );
  };

  // 파일 검증 함수
  const validateImageFile = (file: File): string | null => {
    // 파일 크기 검증 (5MB 제한)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return `파일 크기는 5MB를 초과할 수 없습니다. (${file.name})`;
    }

    // 파일 타입 검증
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return `지원하지 않는 파일 형식입니다. (${file.name})`;
    }

    return null;
  };

  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = validateImageFile(file);
    if (error) {
      alert(error);
      e.target.value = ''; // input 초기화
      return;
    }

    setFormData((prev) => ({ ...prev, mainImage: file }));
  };

  const handleDetailImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const errors: string[] = [];
    const validFiles: File[] = [];

    // 각 파일 검증
    files.forEach((file) => {
      const error = validateImageFile(file);
      if (error) {
        errors.push(error);
      } else {
        validFiles.push(file);
      }
    });

    // 에러가 있으면 알림
    if (errors.length > 0) {
      alert(errors.join('\n'));
      e.target.value = ''; // input 초기화
      return;
    }

    // 최대 10개 파일 제한
    const maxFiles = 10;
    if (formData.detailImages.length + validFiles.length > maxFiles) {
      alert(`최대 ${maxFiles}개의 이미지만 업로드할 수 있습니다.`);
      e.target.value = ''; // input 초기화
      return;
    }

    setFormData((prev) => ({
      ...prev,
      detailImages: [...prev.detailImages, ...validFiles],
    }));
  };

  const removeDetailImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      detailImages: prev.detailImages.filter((_, i) => i !== index),
    }));
  };

  const addDiscountTier = () => {
    const newTier: DiscountTier = {
      id: Date.now().toString(),
      minParticipants: 0,
      discountRate: 0,
    };
    setDiscountTiers((prev) => [...prev, newTier]);
  };

  const removeDiscountTier = (tierId: string) => {
    setDiscountTiers((prev) => prev.filter((tier) => tier.id !== tierId));
  };

  const updateDiscountTier = (tierId: string, field: keyof DiscountTier, value: number) => {
    setDiscountTiers((prev) =>
      prev.map((tier) => (tier.id === tierId ? { ...tier, [field]: value } : tier)),
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제 등록 데이터 구조 예시
    const submitData = {
      ...formData,
      productId: selectedProductId,
      selectedOptions,
      maxQuantityPerPerson,
      discountTiers,
    };
    console.log('공구 등록:', submitData);
    // TODO: API 호출
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-0">
      {/* 타이틀 */}
      <h1 className="mb-10 text-center text-3xl font-semibold text-text-100">공구 등록</h1>

      {/* 알림 배너 */}
      <div className="mb-8 flex items-start gap-3 rounded-lg bg-bg-100 p-6 shadow-sm">
        <Image
          src="/ururu-gradient.svg"
          alt="우르르"
          width={24}
          height={24}
          className="h-6 w-6 flex-shrink-0"
        />
        <div className="flex-1">
          <p className="text-sm font-medium text-text-200">
            새로운 상품을 등록하여 공동구매를 시작하세요!
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-16">
        {/* 상품 선택 */}
        <section>
          <SectionHeader title="상품 선택" description="공동구매를 진행할 상품을 선택해주세요" />
          <div className="mt-8 space-y-8">
            <FormField label="등록된 상품 선택" required>
              <Select
                value={selectedProductId}
                onValueChange={(value) => {
                  setSelectedProductId(value);
                  setSelectedOptions([]); // 상품 바뀌면 옵션 초기화
                }}
              >
                <SelectTrigger className="h-12 rounded-lg border-bg-300 bg-bg-100 px-4 text-left text-sm text-text-100 placeholder:text-text-300 focus:border-primary-300 focus:ring-2 focus:ring-primary-300">
                  <SelectValue placeholder="상품을 선택해주세요" />
                </SelectTrigger>
                <SelectContent className="z-[80] max-h-60 bg-bg-100">
                  {MOCK_PRODUCTS.map((mockProduct) => (
                    <SelectItem
                      key={mockProduct.id}
                      value={mockProduct.id}
                      className="cursor-pointer text-text-100 hover:bg-primary-100 hover:text-primary-300 focus:bg-primary-100 focus:text-primary-300"
                    >
                      {mockProduct.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            {selectedProduct && (
              <FormField label="상품 옵션 선택" required>
                <OptionSelector
                  options={selectedProduct.options}
                  selectedOptions={selectedOptions}
                  onToggle={handleOptionToggle}
                />
              </FormField>
            )}

            <FormField label="1인당 최대 구매 수량" required>
              <Input
                type="number"
                value={maxQuantityPerPerson}
                onChange={(e) => setMaxQuantityPerPerson(Number(e.target.value))}
                placeholder="1"
                className={FORM_STYLES.input.base}
                min="1"
                required
              />
            </FormField>
          </div>
        </section>

        {/* 공구 기본 정보 */}
        <section>
          <SectionHeader title="공구 기본 정보" description="공구의 기본 정보를 입력해주세요" />
          <div className="mt-8 space-y-6">
            <FormField
              label="공구 제목"
              required
              characterCount={{ current: formData.title.length, max: 100 }}
            >
              <Input
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="EX) 수분 진정 토너 공동구매"
                className={FORM_STYLES.input.base}
                maxLength={100}
                required
              />
            </FormField>

            <FormField
              label="공구 설명"
              required
              characterCount={{ current: formData.description.length, max: 1000 }}
            >
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="공구에 대한 상세한 설명을 입력해주세요"
                className={FORM_STYLES.textarea.base}
                rows={4}
                maxLength={1000}
                required
              />
            </FormField>

            <FormField label="대표 이미지 업로드" required>
              <div className="cursor-pointer rounded-lg border-2 border-dashed border-bg-300 p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMainImageUpload}
                  className="hidden"
                  id="main-image-upload"
                />
                <label
                  htmlFor="main-image-upload"
                  className="flex cursor-pointer flex-col items-center justify-center"
                >
                  <Upload className="mb-2 h-8 w-8 text-text-300" />
                  <span className="text-sm text-text-300">대표 이미지를 업로드하세요</span>
                </label>
                {formData.mainImage && (
                  <div className="mt-2 flex items-center justify-center gap-2">
                    <ImageIcon className="h-4 w-4 text-text-300" />
                    <span className="text-sm text-text-200">{formData.mainImage.name}</span>
                  </div>
                )}
              </div>
            </FormField>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField label="시작일" required>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={
                        FORM_STYLES.input.base +
                        ' flex w-full items-center justify-between font-normal'
                      }
                    >
                      {formData.startDate ? (
                        format(formData.startDate, 'yyyy-MM-dd')
                      ) : (
                        <span className="text-text-300">시작일 선택</span>
                      )}
                      <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.startDate}
                      onSelect={(date) => setFormData((prev) => ({ ...prev, startDate: date }))}
                      captionLayout="dropdown"
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormField>
              <FormField label="종료일" required>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={
                        FORM_STYLES.input.base +
                        ' flex w-full items-center justify-between font-normal'
                      }
                    >
                      {formData.endDate ? (
                        format(formData.endDate, 'yyyy-MM-dd')
                      ) : (
                        <span className="text-text-300">종료일 선택</span>
                      )}
                      <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.endDate}
                      onSelect={(date) => setFormData((prev) => ({ ...prev, endDate: date }))}
                      captionLayout="dropdown"
                      disabled={(date) =>
                        date < new Date() ||
                        (formData.startDate ? date < formData.startDate : false)
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormField>
            </div>
          </div>
        </section>

        {/* 상세 페이지 */}
        <section>
          <SectionHeader title="상세 페이지" description="상세 이미지를 등록해주세요" />
          <div className="mt-8">
            <FormField label="상세 이미지 업로드">
            <div className="cursor-pointer rounded-lg border-2 border-dashed border-bg-300 p-6 text-center">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleDetailImageUpload}
                className="hidden"
                id="detail-images-upload"
              />
              <label
                htmlFor="detail-images-upload"
                className="flex cursor-pointer flex-col items-center justify-center"
              >
                <Upload className="mb-2 h-8 w-8 text-text-300" />
                <span className="text-sm text-text-300">상세 이미지를 업로드하세요</span>
              </label>
            </div>
            {formData.detailImages.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                {formData.detailImages.map((image, index) => (
                  <div key={index} className="relative">
                    <div className="aspect-square rounded-lg bg-bg-200 p-2">
                      <div className="flex h-full items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-text-300" />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          detailImages: prev.detailImages.filter((_, i) => i !== index),
                        }))
                      }
                      className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white"
                    >
                      <X className="h-3 w-3" />
                    </button>
                    <p className="mt-1 truncate text-xs text-text-200">{image.name}</p>
                  </div>
                ))}
              </div>
            )}
          </FormField>
          </div>
        </section>

        {/* 할인 단계 설정 */}
        <section>
          <SectionHeader
            title="할인 단계 설정"
            description="참여 인원에 따른 할인 단계를 설정해주세요"
          />
          <div className="mt-8 space-y-6">
            {discountTiers.map((tier, index) => (
              <div
                key={tier.id}
                className="relative rounded-2xl border border-bg-300 bg-bg-100 p-6"
              >
                <div className="absolute right-4 top-4">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeDiscountTier(tier.id)}
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
                        type="number"
                        value={tier.minParticipants}
                        onChange={(e) =>
                          updateDiscountTier(tier.id, 'minParticipants', Number(e.target.value))
                        }
                        placeholder="10"
                        className={FORM_STYLES.input.base + ' pr-12'}
                        min="1"
                        required
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-300">
                        명
                      </span>
                    </div>
                  </FormField>
                  <FormField label="할인율" required>
                    <div className="relative">
                      <Input
                        type="number"
                        value={tier.discountRate}
                        onChange={(e) =>
                          updateDiscountTier(tier.id, 'discountRate', Number(e.target.value))
                        }
                        placeholder="10"
                        className={FORM_STYLES.input.base + ' pr-8'}
                        min="0"
                        max="100"
                        required
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-300">
                        %
                      </span>
                    </div>
                  </FormField>
                </div>
              </div>
            ))}
            <Button
              type="button"
              onClick={addDiscountTier}
              className={FORM_STYLES.button.pinkOutline + ' mt-2 h-12 w-full'}
            >
              할인 단계 추가하기
            </Button>
          </div>
        </section>

        {/* 등록 버튼 */}
        <div className="pt-8">
          <Button
            type="submit"
            className="h-12 w-full rounded-lg bg-primary-300 text-sm font-medium text-text-on transition hover:opacity-80 focus:ring-primary-300 active:opacity-90"
          >
            등록하기
          </Button>
        </div>
      </form>
    </div>
  );
}
