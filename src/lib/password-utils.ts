import { VALIDATION_CONSTANTS } from '@/constants/validation';

// 비밀번호 조건 체크 함수들
export const checkPasswordLength = (password: string): boolean => {
  return Boolean(password && password.length >= VALIDATION_CONSTANTS.PASSWORD.MIN_LENGTH);
};

export const checkPasswordHasLetter = (password: string): boolean => {
  return Boolean(password && VALIDATION_CONSTANTS.PASSWORD.LETTERS.test(password));
};

export const checkPasswordHasNumber = (password: string): boolean => {
  return Boolean(password && VALIDATION_CONSTANTS.PASSWORD.NUMBERS.test(password));
};

export const checkPasswordHasSpecial = (password: string): boolean => {
  return Boolean(password && VALIDATION_CONSTANTS.PASSWORD.SPECIAL_CHARS.test(password));
};

export const isPasswordValid = (password: string): boolean => {
  return (
    checkPasswordLength(password) &&
    checkPasswordHasLetter(password) &&
    checkPasswordHasNumber(password) &&
    checkPasswordHasSpecial(password)
  );
};

// 비밀번호 일치 여부 확인
export const isPasswordMatch = (password: string, passwordConfirm: string) => {
  return password && passwordConfirm && password === passwordConfirm;
};

// 비밀번호 확인 메시지
export const getPasswordConfirmMessage = (password: string, passwordConfirm: string) => {
  if (!passwordConfirm) return '';
  if (password === passwordConfirm) {
    return '비밀번호가 일치합니다.';
  } else {
    return '비밀번호가 일치하지 않습니다.';
  }
};

// 글자 수 표시 함수
export const getLength = (value: string, max: number) => `${value?.length || 0}/${max}자`;
