import { useState } from 'react';

interface ImageUploadOptions {
  maxFileSize?: number; // MB 단위
  allowedTypes?: string[]; // 허용할 이미지 타입
  maxFiles?: number; // 최대 파일 개수
}

export function useImageUpload(initial: File[] = [], options: ImageUploadOptions = {}) {
  const {
    maxFileSize = 10, // 기본 10MB
    allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    maxFiles = 10, // 기본 10개
  } = options;

  const [images, setImages] = useState<File[]>(initial);
  const [errors, setErrors] = useState<string[]>([]);

  const validateFile = (file: File): string | null => {
    // 파일 타입 검증
    if (!allowedTypes.includes(file.type)) {
      return `지원하지 않는 파일 형식입니다: ${file.name}`;
    }

    // 파일 크기 검증 (MB 단위)
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > maxFileSize) {
      return `파일 크기가 너무 큽니다: ${file.name} (${fileSizeInMB.toFixed(1)}MB)`;
    }

    return null;
  };

  const addImages = (files: FileList | File[] | null) => {
    if (!files || files.length === 0) {
      setErrors(['파일을 선택해주세요.']);
      return;
    }

    const arr = Array.from(files);
    const newErrors: string[] = [];
    const validFiles: File[] = [];

    // 파일 개수 제한 확인
    if (images.length + arr.length > maxFiles) {
      newErrors.push(`최대 ${maxFiles}개의 파일만 업로드할 수 있습니다.`);
    }

    // 각 파일 검증
    arr.forEach((file) => {
      const error = validateFile(file);
      if (error) {
        newErrors.push(error);
      } else {
        validFiles.push(file);
      }
    });

    // 에러가 있으면 에러만 설정
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    // 유효한 파일들만 추가
    setImages((prev) => [...prev, ...validFiles]);
    setErrors([]); // 성공 시 에러 초기화
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setErrors([]); // 이미지 제거 시 에러 초기화
  };

  const reset = () => {
    setImages(initial);
    setErrors([]);
  };

  const clearErrors = () => setErrors([]);

  return {
    images,
    addImages,
    removeImage,
    reset,
    errors,
    clearErrors,
    hasErrors: errors.length > 0,
  };
}
