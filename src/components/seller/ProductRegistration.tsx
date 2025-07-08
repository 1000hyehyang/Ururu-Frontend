'use client';

import { useState } from 'react';
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
import { FormField } from '@/components/form/FormField';
import { FORM_STYLES } from '@/constants/form-styles';
import { PRODUCT_CATEGORY_DATA, CAPACITY_UNITS } from '@/data/seller';
import { useFormArray } from '@/hooks/seller/useFormArray';
import { OptionList } from './common/OptionList';
import { SectionHeader } from '@/components/common/SectionHeader';

interface ProductOption {
  id: string;
  name: string;
  price: number;
  image: File | null;
  stock: number;
}

interface ProductFormData {
  name: string;
  description: string;
  categoryMain: string;
  categoryMiddle: string;
  categorySub: string;
  options: ProductOption[];
  // 화장품 정보제공고시
  capacity: string;
  capacityUnit: string;
  specification: string;
  expiryDate: string;
  usage: string;
  manufacturer: string;
  seller: string;
  country: string;
  functionalTest: 'yes' | 'no';
  precautions: string;
  qualityStandard: string;
  customerService: string;
}

export function ProductRegistration() {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    categoryMain: '',
    categoryMiddle: '',
    categorySub: '',
    options: [],
    capacity: '',
    capacityUnit: 'ml',
    specification: '',
    expiryDate: '',
    usage: '',
    manufacturer: '',
    seller: '',
    country: '',
    functionalTest: 'no',
    precautions: '',
    qualityStandard: '',
    customerService: '',
  });

  const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 옵션 관리 로직을 useFormArray로 대체
  const optionArray = useFormArray<ProductOption>(formData.options);

  // 기존 addOption, removeOption, updateOption, handleImageUpload 대체
  const handleOptionChange = (id: string, field: keyof ProductOption, value: any) => {
    optionArray.update(
      (opt) => opt.id === id,
      (opt) => ({ ...opt, [field]: value }),
    );
  };
  const handleOptionRemove = (id: string) => {
    optionArray.remove((opt) => opt.id === id);
  };
  const handleOptionImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleOptionChange(id, 'image', file);
  };
  const handleAddOption = () => {
    optionArray.add({
      id: Date.now().toString(),
      name: '',
      price: 0,
      image: null,
      stock: 0,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('상품 등록:', formData);
    // TODO: API 호출
  };

  const getMiddleCategories = () => {
    return formData.categoryMain
      ? PRODUCT_CATEGORY_DATA.middle[
          formData.categoryMain as keyof typeof PRODUCT_CATEGORY_DATA.middle
        ] || []
      : [];
  };

  const getSubCategories = () => {
    return formData.categoryMiddle
      ? PRODUCT_CATEGORY_DATA.sub[
          formData.categoryMiddle as keyof typeof PRODUCT_CATEGORY_DATA.sub
        ] || []
      : [];
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-0">
      {/* 타이틀 */}
      <h1 className="mb-10 text-center text-3xl font-semibold text-text-100">상품 등록</h1>

      <form onSubmit={handleSubmit} className="space-y-16">
        {/* 상품 기본 정보 */}
        <section>
          <SectionHeader
            title="상품 기본 정보"
            description="판매할 상품의 기본 정보를 입력해주세요"
          />

          <div className="mt-8 space-y-6">
            <FormField label="상품명" required>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="EX) 컬러그램 누디 블러 틴트 20 COLOR"
                className={FORM_STYLES.input.base}
                required
              />
            </FormField>

            <FormField
              label="상품 설명"
              required
              characterCount={{ current: formData.description.length, max: 200 }}
            >
              <Textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="EX) 한 번에 터치하고 입술 보정 필터"
                className={FORM_STYLES.textarea.base}
                rows={2}
                maxLength={200}
                required
              />
            </FormField>

            {/* 카테고리 */}
            <FormField label="카테고리" required>
              <div className="flex gap-2">
                <Select
                  value={formData.categoryMain}
                  onValueChange={(value) => {
                    handleInputChange('categoryMain', value);
                    handleInputChange('categoryMiddle', '');
                    handleInputChange('categorySub', '');
                  }}
                >
                  <SelectTrigger className="h-12 w-1/3 rounded-lg border-bg-300 bg-bg-100 px-4 text-left text-sm text-text-100 placeholder:text-text-300 focus:border-primary-300 focus:ring-2 focus:ring-primary-300">
                    <SelectValue placeholder="대분류" />
                  </SelectTrigger>
                  <SelectContent className="z-[80] max-h-60 bg-bg-100">
                    {PRODUCT_CATEGORY_DATA.main.map((category) => (
                      <SelectItem
                        key={category}
                        value={category}
                        className="cursor-pointer text-text-100 hover:bg-primary-100 hover:text-primary-300 focus:bg-primary-100 focus:text-primary-300"
                      >
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={formData.categoryMiddle}
                  onValueChange={(value) => {
                    handleInputChange('categoryMiddle', value);
                    handleInputChange('categorySub', '');
                  }}
                  disabled={!formData.categoryMain}
                >
                  <SelectTrigger className="h-12 w-1/3 rounded-lg border-bg-300 bg-bg-100 px-4 text-left text-sm text-text-100 placeholder:text-text-300 focus:border-primary-300 focus:ring-2 focus:ring-primary-300 disabled:cursor-not-allowed disabled:opacity-60">
                    <SelectValue placeholder="중분류" />
                  </SelectTrigger>
                  <SelectContent className="z-[80] max-h-60 bg-bg-100">
                    {getMiddleCategories().map((category) => (
                      <SelectItem
                        key={category}
                        value={category}
                        className="cursor-pointer text-text-100 hover:bg-primary-100 hover:text-primary-300 focus:bg-primary-100 focus:text-primary-300"
                      >
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={formData.categorySub}
                  onValueChange={(value) => handleInputChange('categorySub', value)}
                  disabled={!formData.categoryMiddle}
                >
                  <SelectTrigger className="h-12 w-1/3 rounded-lg border-bg-300 bg-bg-100 px-4 text-left text-sm text-text-100 placeholder:text-text-300 focus:border-primary-300 focus:ring-2 focus:ring-primary-300 disabled:cursor-not-allowed disabled:opacity-60">
                    <SelectValue placeholder="소분류" />
                  </SelectTrigger>
                  <SelectContent className="z-[80] max-h-60 bg-bg-100">
                    {getSubCategories().map((category) => (
                      <SelectItem
                        key={category}
                        value={category}
                        className="cursor-pointer text-text-100 hover:bg-primary-100 hover:text-primary-300 focus:bg-primary-100 focus:text-primary-300"
                      >
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </FormField>
          </div>
        </section>

        {/* 옵션 관리 */}
        <section>
          <SectionHeader
            title="상품 옵션 설정"
            description="판매할 상품의 다양한 옵션을 설정해주세요"
          />

          <div className="mt-8">
            <OptionList
              options={optionArray.items}
              onChange={handleOptionChange}
              onRemove={handleOptionRemove}
              onImageUpload={handleOptionImageUpload}
            />
            <Button
              type="button"
              onClick={handleAddOption}
              className={FORM_STYLES.button.submit + ' mt-4 w-full'}
            >
              옵션 추가하기
            </Button>
          </div>
        </section>

        {/* 화장품 정보제공고시 */}
        <section>
          <SectionHeader
            title="화장품 정보제공고시"
            description="화장품 판매에 따른 필수 정보입니다. 정확하게 입력해주세요."
          />

          <div className="mt-8 space-y-6">
            <div className="flex gap-2">
              <FormField label="내용물의 용량 또는 중량" required className="flex-1">
                <Input
                  value={formData.capacity}
                  onChange={(e) => handleInputChange('capacity', e.target.value)}
                  placeholder=""
                  className={FORM_STYLES.input.base}
                  required
                />
              </FormField>
              <FormField label="단위" required className="w-32">
                <Select
                  value={formData.capacityUnit}
                  onValueChange={(value) => handleInputChange('capacityUnit', value)}
                >
                  <SelectTrigger className="h-12 rounded-lg border-bg-300 bg-bg-100 px-4 text-left text-sm text-text-100 placeholder:text-text-300 focus:border-primary-300 focus:ring-2 focus:ring-primary-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="z-[80] max-h-60 bg-bg-100">
                    {CAPACITY_UNITS.map((unit) => (
                      <SelectItem
                        key={unit}
                        value={unit}
                        className="cursor-pointer text-text-100 hover:bg-primary-100 hover:text-primary-300 focus:bg-primary-100 focus:text-primary-300"
                      >
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
            </div>
            <FormField label="제품 주요 사양" required>
              <Input
                value={formData.specification}
                onChange={(e) => handleInputChange('specification', e.target.value)}
                placeholder="EX) 모든 피부"
                className={FORM_STYLES.input.base}
                required
              />
            </FormField>
            <FormField label="사용기한(또는 개봉 후 사용기간)" required>
              <Input
                value={formData.expiryDate}
                onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                placeholder="EX) 제조일로부터 24개월"
                className={FORM_STYLES.input.base}
                required
              />
            </FormField>
            <FormField label="사용법" required>
              <Textarea
                value={formData.usage}
                onChange={(e) => handleInputChange('usage', e.target.value)}
                placeholder="EX) 적당량의 내용을 손에 덜어 얼굴에 부드럽게 펴 발라줍니다."
                className={FORM_STYLES.textarea.base}
                rows={2}
                required
              />
            </FormField>
            <FormField label="화장품제조업자" required>
              <Input
                value={formData.manufacturer}
                onChange={(e) => handleInputChange('manufacturer', e.target.value)}
                placeholder=""
                className={FORM_STYLES.input.base}
                required
              />
            </FormField>
            <FormField label="화장품책임판매업자" required>
              <Input
                value={formData.seller}
                onChange={(e) => handleInputChange('seller', e.target.value)}
                placeholder=""
                className={FORM_STYLES.input.base}
                required
              />
            </FormField>
            <FormField label="제조국" required>
              <Input
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                placeholder="대한민국"
                className={FORM_STYLES.input.base}
                required
              />
            </FormField>
            <FormField label="기능성 화장품 식품의약품안전처 심사필 여부" required>
              <div className="mt-2 flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="functionalTest"
                    value="yes"
                    checked={formData.functionalTest === 'yes'}
                    onChange={(e) => handleInputChange('functionalTest', e.target.value)}
                    className="custom-radio"
                    required
                  />
                  <span className="text-sm text-text-100">있음</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="functionalTest"
                    value="no"
                    checked={formData.functionalTest === 'no'}
                    onChange={(e) => handleInputChange('functionalTest', e.target.value)}
                    className="custom-radio"
                    required
                  />
                  <span className="text-sm text-text-100">없음</span>
                </label>
              </div>
            </FormField>
            <FormField label="사용할 때의 주의사항" required>
              <Textarea
                value={formData.precautions}
                onChange={(e) => handleInputChange('precautions', e.target.value)}
                placeholder=""
                className={FORM_STYLES.textarea.base}
                rows={2}
                required
              />
            </FormField>
            <FormField label="품질보증기준" required>
              <Textarea
                value={formData.qualityStandard}
                onChange={(e) => handleInputChange('qualityStandard', e.target.value)}
                placeholder="EX) 본 상품에 이상이 있을 경우 공정거래위원회 고시 '소비자분쟁 해결기준'에 의해 보상해 드립니다."
                className={FORM_STYLES.textarea.base}
                rows={2}
                required
              />
            </FormField>
            <FormField label="소비자상담 전화번호" required>
              <Input
                value={formData.customerService}
                onChange={(e) => handleInputChange('customerService', e.target.value)}
                placeholder="0000-0000"
                className={FORM_STYLES.input.base}
                required
              />
            </FormField>
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
