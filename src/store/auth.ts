import { create } from 'zustand';

interface LoginFormData {
  email: string;
  password: string;
}

interface SignupFormData {
  email: string;
  password: string;
  passwordConfirm: string;
  brand: string;
  company: string;
  ceo: string;
  businessNumber: string;
  phone: string;
  zipcode: string;
  addressRoad: string;
  addressJibun: string;
  addressDetail: string;
}

interface Agreements {
  all: boolean;
  terms: boolean;
  privacy: boolean;
  marketing: boolean;
}

interface AuthState {
  // 로그인 상태
  loginType: 'buyer' | 'seller';
  loginFormData: LoginFormData;

  // 회원가입 상태
  signupFormData: SignupFormData;
  agreements: Agreements;
  brandGuide: string;
  brandGuideType: 'success' | 'error' | 'guide';

  // 인증 상태 관련 추가
  isLoggedIn?: boolean;
  userInfo?: any;

  setLoginType: (type: 'buyer' | 'seller') => void;
  setLoginFormData: (data: Partial<LoginFormData>) => void;
  setSignupFormData: (data: Partial<SignupFormData>) => void;
  setAgreements: (agreements: Partial<Agreements>) => void;
  setBrandGuide: (guide: string, type: 'success' | 'error' | 'guide') => void;
  resetLoginForm: () => void;
  resetSignupForm: () => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
  setUserInfo: (user: any | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // 초기 상태
  loginType: 'buyer',
  loginFormData: {
    email: '',
    password: '',
  },
  signupFormData: {
    email: '',
    password: '',
    passwordConfirm: '',
    brand: '',
    company: '',
    ceo: '',
    businessNumber: '',
    phone: '',
    zipcode: '',
    addressRoad: '',
    addressJibun: '',
    addressDetail: '',
  },
  agreements: {
    all: false,
    terms: false,
    privacy: false,
    marketing: false,
  },
  brandGuide: '',
  brandGuideType: 'guide',

  // 인증 상태 관련 초기값
  isLoggedIn: false,
  userInfo: null,

  // 액션들
  setLoginType: (type) => set({ loginType: type }),

  setLoginFormData: (data) =>
    set((state) => ({
      loginFormData: { ...state.loginFormData, ...data },
    })),

  setSignupFormData: (data) =>
    set((state) => ({
      signupFormData: { ...state.signupFormData, ...data },
    })),

  setAgreements: (agreements) =>
    set((state) => {
      const newAgreements = { ...state.agreements, ...agreements };

      // "전체 동의" 체크박스가 변경된 경우 모든 개별 약관 동기화
      if ('all' in agreements) {
        newAgreements.terms = agreements.all!;
        newAgreements.privacy = agreements.all!;
        newAgreements.marketing = agreements.all!;
      } else {
        // 개별 약관이 변경된 경우 "전체 동의" 상태 업데이트
        newAgreements.all = newAgreements.terms && newAgreements.privacy && newAgreements.marketing;
      }

      return {
        agreements: newAgreements,
      };
    }),

  setBrandGuide: (guide, type) => set({ brandGuide: guide, brandGuideType: type }),

  resetLoginForm: () =>
    set({
      loginFormData: { email: '', password: '' },
    }),

  resetSignupForm: () =>
    set({
      signupFormData: {
        email: '',
        password: '',
        passwordConfirm: '',
        brand: '',
        company: '',
        ceo: '',
        businessNumber: '',
        phone: '',
        zipcode: '',
        addressRoad: '',
        addressJibun: '',
        addressDetail: '',
      },
      agreements: {
        all: false,
        terms: false,
        privacy: false,
        marketing: false,
      },
      brandGuide: '',
      brandGuideType: 'guide',
    }),

  setIsLoggedIn: (loggedIn) =>
    set((state) => ({
      isLoggedIn: loggedIn,
      userInfo: loggedIn ? state.userInfo : null, // 로그아웃 시 사용자 정보도 초기화
    })),

  setUserInfo: (user) =>
    set({
      userInfo: user,
      isLoggedIn: user !== null, // 사용자 정보가 있으면 로그인 상태 true
    }),

  logout: () =>
    set({
      isLoggedIn: false,
      userInfo: null,
    }),
}));
