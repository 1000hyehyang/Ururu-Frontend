interface ImageValidationOptions {
  maxSize?: number; // MB 단위
  allowedTypes?: string[];
  maxFiles?: number;
}

export function useImageValidation(options: ImageValidationOptions = {}) {
  const {
    maxSize = 5, // 기본 5MB
    allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    maxFiles = 10,
  } = options;

  const validateImageFile = (file: File): string | null => {
    // 파일 크기 검증
    const maxSizeBytes = maxSize * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return `파일 크기는 ${maxSize}MB를 초과할 수 없습니다. (${file.name})`;
    }

    // 파일 타입 검증
    if (!allowedTypes.includes(file.type)) {
      return `지원하지 않는 파일 형식입니다. (${file.name})`;
    }

    return null;
  };

  const validateMultipleFiles = (
    files: File[],
    currentCount = 0,
  ): { errors: string[]; validFiles: File[] } => {
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

    // 최대 파일 개수 제한
    if (currentCount + validFiles.length > maxFiles) {
      errors.push(`최대 ${maxFiles}개의 이미지만 업로드할 수 있습니다.`);
    }

    return { errors, validFiles };
  };

  return {
    validateImageFile,
    validateMultipleFiles,
  };
}
