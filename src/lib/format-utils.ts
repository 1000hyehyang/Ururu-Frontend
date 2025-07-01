import { VALIDATION_CONSTANTS } from '@/constants/validation';

// 전화번호 자동 하이픈 포맷팅 함수
export const formatPhoneNumber = (value: string) => {
  // 숫자만 추출
  const numbers = value.replace(/[^0-9]/g, '');

  // 길이에 따라 하이픈 추가
  if (numbers.length <= 3) {
    return numbers;
  } else if (numbers.length <= 7) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  } else {
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, VALIDATION_CONSTANTS.PHONE.MAX_LENGTH)}`;
  }
};

// 사업자등록번호 자동 하이픈 포맷팅 함수
export const formatBusinessNumber = (value: string) => {
  // 숫자만 추출
  const numbers = value.replace(/[^0-9]/g, '');

  // 길이에 따라 하이픈 추가 (123-45-67890 형식)
  if (numbers.length <= 3) {
    return numbers;
  } else if (numbers.length <= 5) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  } else {
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 5)}-${numbers.slice(5, VALIDATION_CONSTANTS.BUSINESS_NUMBER.MAX_LENGTH)}`;
  }
};
