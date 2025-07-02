'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/form';
import { Star, Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FORM_STYLES } from '@/constants/form-styles';
import Image from 'next/image';
import { useReviewWrite } from '@/hooks/useReviewWrite';

interface ReviewWriteFormProps {
  categoryId?: number;
}

export function ReviewWriteForm({ categoryId }: ReviewWriteFormProps) {
  const {
    reviewData,
    categoryOptions,
    createObjectUrl,
    handleRatingChange,
    handleAttributeChange,
    handleTextChange,
    handleImageUpload,
    handleImageRemove,
    handleSubmit,
    isFormValid,
  } = useReviewWrite({ categoryId });

  // 카테고리 옵션이 없는 경우 로딩 상태 표시
  if (!categoryOptions) {
    return (
      <Card className="w-full rounded-2xl border-0 bg-bg-100 px-4 py-6 shadow-none md:px-8">
        <CardContent className="p-0">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="mb-4 text-lg font-medium text-text-300">
                카테고리 정보를 불러오는 중...
              </div>
              <div className="text-sm text-text-400">잠시만 기다려주세요.</div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full rounded-2xl border-0 bg-bg-100 px-4 py-6 shadow-none md:px-8">
      <CardContent className="p-0">
        <h1 className="mb-6 text-center text-2xl font-semibold md:text-2xl">리뷰 작성</h1>

        {/* 카테고리 정보 */}
        <div className="mb-4 text-center">
          <span className="text-sm text-text-300">카테고리: </span>
          <span className="text-sm font-medium text-text-100">{categoryOptions.categoryName}</span>
        </div>

        {/* 알림 박스 */}
        <div className="mb-8 flex items-start gap-3 rounded-lg bg-bg-100 p-6 shadow-sm">
          <Image
            src="/ururu-gradient.svg"
            alt="우르르"
            width={24}
            height={24}
            className="h-6 w-6 flex-shrink-0"
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-text-300">
              리뷰를 작성하면 <span className="font-semibold text-primary-200">50P</span>를 획득할
              수 있어요!
              <span className="font-semibold text-primary-200"> 포토 리뷰</span>라면{' '}
              <span className="font-semibold text-primary-200">100P</span>!
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-6">
          {/* 별점 평가 */}
          <FormField label="상품은 어땠나요?" required>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingChange(star)}
                  className="flex h-10 w-10 items-center justify-center md:h-12 md:w-12"
                >
                  <Star
                    className={cn(
                      'h-8 w-8 transition-colors md:h-10 md:w-10',
                      star <= reviewData.rating
                        ? 'fill-primary-200 text-primary-200'
                        : 'text-bg-300',
                    )}
                  />
                </button>
              ))}
            </div>
          </FormField>

          {/* 카테고리별 속성 평가 */}
          {categoryOptions.attributes.map((attribute) => (
            <FormField key={attribute.name} label={attribute.name} required>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {attribute.options.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleAttributeChange(attribute.name, option.code)}
                    className={cn(
                      FORM_STYLES.button.selectable.base,
                      reviewData.attributes[attribute.name] === option.code
                        ? FORM_STYLES.button.selectable.selected
                        : FORM_STYLES.button.selectable.unselected,
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </FormField>
          ))}

          {/* 리뷰 이미지 첨부 */}
          <FormField
            label="리뷰 이미지 첨부"
            helperText="실사용 이미지를 첨부하면 더욱 유용한 리뷰가 돼요 (최대 5장)"
          >
            <div className="space-y-4">
              {/* 업로드 버튼 */}
              <div className="relative">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  disabled={reviewData.images.length >= 5}
                />
                <div
                  className={cn(
                    'flex h-24 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed transition-colors md:h-32',
                    reviewData.images.length >= 5
                      ? 'cursor-not-allowed border-bg-300 bg-bg-200'
                      : 'hover:bg-primary-50 border-bg-300 bg-bg-100 hover:border-primary-300',
                  )}
                >
                  <div className="flex flex-col items-center gap-2 text-center">
                    <Upload className="h-6 w-6 text-text-300 md:h-8 md:w-8" />
                    <span className="text-sm text-text-300">
                      {reviewData.images.length >= 5
                        ? '최대 5장까지 업로드 가능합니다'
                        : '이미지를 업로드하세요'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 업로드된 이미지 리스트 */}
              {reviewData.images.length > 0 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {reviewData.images.map((file, index) => (
                    <div key={index} className="group relative flex-shrink-0">
                      <div className="relative h-20 w-20 overflow-hidden rounded-lg shadow-sm md:h-24 md:w-24">
                        <Image
                          src={createObjectUrl(file)}
                          alt={`업로드된 이미지 ${index + 1}`}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleImageRemove(index)}
                        className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-text-100 text-white opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <p className="mt-1 truncate text-xs text-text-300">{file.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </FormField>

          {/* 텍스트 리뷰 */}
          <FormField
            label="솔직한 상품 리뷰를 남겨주세요"
            required
            characterCount={{ current: reviewData.text.length, max: 500 }}
          >
            <textarea
              value={reviewData.text}
              onChange={handleTextChange}
              placeholder="꿀팁 가득, 상세한 리뷰를 작성해보세요!"
              className={
                FORM_STYLES.textarea.base +
                ' ' +
                FORM_STYLES.textarea.focus +
                ' min-h-[120px] w-full'
              }
              rows={5}
            />
          </FormField>

          {/* 제출 버튼 */}
          <Button
            type="submit"
            className={FORM_STYLES.button.submit + ' mt-6 text-sm font-medium'}
            disabled={!isFormValid}
          >
            리뷰 작성 완료
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
