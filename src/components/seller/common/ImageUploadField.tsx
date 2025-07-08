import React from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { FormField } from '@/components/form/FormField';

interface ImageUploadFieldProps {
  label: string;
  required?: boolean;
  multiple?: boolean;
  accept?: string;
  placeholder?: string;
  uploadedFiles?: File[];
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove?: (index: number) => void;
  id: string;
  variant?: 'default' | 'option'; // 옵션 이미지용 variant 추가
}

export function ImageUploadField({
  label,
  required = false,
  multiple = false,
  accept = 'image/*',
  placeholder = '이미지를 업로드하세요',
  uploadedFiles = [],
  onUpload,
  onRemove,
  id,
  variant = 'default',
}: ImageUploadFieldProps) {
  const isOptionVariant = variant === 'option';

  return (
    <FormField label={label} required={required}>
      <div
        className={`cursor-pointer rounded-lg border-2 border-dashed border-bg-300 p-6 text-center ${
          isOptionVariant ? 'bg-bg-100' : ''
        }`}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={onUpload}
          className="hidden"
          id={id}
        />
        <label htmlFor={id} className="flex cursor-pointer flex-col items-center justify-center">
          <Upload className="mb-2 h-8 w-8 text-text-300" />
          <span className="text-sm text-text-300">{placeholder}</span>
        </label>
        {/* 대표 이미지 미리보기 */}
        {!multiple && uploadedFiles.length === 1 && (
          <div className="mt-4 flex flex-col items-center">
            <div
              className="relative"
              style={{
                maxWidth: isOptionVariant ? 120 : 240,
                maxHeight: isOptionVariant ? 90 : 180,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={URL.createObjectURL(uploadedFiles[0])}
                alt="미리보기"
                className="rounded-lg object-contain"
                style={{
                  maxWidth: isOptionVariant ? 120 : 240,
                  maxHeight: isOptionVariant ? 90 : 180,
                  width: 'auto',
                  height: 'auto',
                }}
              />
            </div>
            <span className="mt-2 text-xs text-text-200">{uploadedFiles[0].name}</span>
          </div>
        )}
        {/* 파일명/개수 표시 */}
        {uploadedFiles.length > 0 && (
          <div className="mt-2 flex items-center justify-center gap-2">
            <ImageIcon className="h-4 w-4 text-text-300" />
            <span className="text-sm text-text-200">
              {multiple ? `${uploadedFiles.length}개 파일` : uploadedFiles[0].name}
            </span>
          </div>
        )}
      </div>
      {multiple && uploadedFiles.length > 0 && onRemove && (
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          {uploadedFiles.map((file, index) => (
            <div key={index} className="relative">
              <div className="aspect-square rounded-lg bg-bg-200 p-2">
                <div className="flex h-full items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-text-300" />
                </div>
              </div>
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white"
              >
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <p className="mt-1 truncate text-xs text-text-200">{file.name}</p>
            </div>
          ))}
        </div>
      )}
    </FormField>
  );
}
