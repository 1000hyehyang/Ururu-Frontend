# 🚀 로컬 개발 환경 설정

## 1. 프로젝트 클론

```bash
git clone https://github.com/UruruLab/Ururu-Frontend.git
cd Ururu-Frontend
```

## 2. 패키지 설치

```bash
npm install
```

> ⚠️ node_modules는 Git에 포함되어 있지 않으므로 반드시 `npm install`을 실행해야 합니다.

## 3. 환경변수 설정

`.env.local` 파일을 루트에 생성해주세요.

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
```

> 프론트엔드에서 로컬 백엔드 API를 호출하려면, 위 예시처럼 `.env.local` 파일을 설정해 주세요.

## 4. 개발 서버 실행

```bash
npm run dev
```

- 기본 주소: http://localhost:3000
- 변경된 코드는 저장 시 자동 리렌더링됩니다.

## VSCode 설정 가이드

📌 필수 확장 추천

- Prettier – Code formatter
- EditorConfig for VSCode
- Tailwind CSS IntelliSense

# 우르르 (Ururu) - 뷰티 공동구매 커머스

Next.js 14와 TypeScript를 기반으로 한 반응형 뷰티 커머스 플랫폼입니다.

## 🎨 디자인 시스템

### Breakpoints

- **모바일**: 375px
- **태블릿**: 768px
- **데스크탑**: 1280px

### 마진 설정

- **모바일**: 24px
- **태블릿**: 36px
- **데스크탑**: 48px

### 색상 시스템

```css
/* Primary Colors */
--primary-100: hsla(0, 100%, 96.7%, 1);
--primary-200: hsla(6, 100%, 75.5%, 1);
--primary-300: hsla(348, 100%, 70.6%, 1);

/* Text Colors */
--text-100: hsla(0, 0%, 14.1%, 1);
--text-200: hsla(0, 0%, 40%, 1);
--text-300: hsla(0, 0%, 70.2%, 1);
--text-400: hsla(0, 0%, 86.7%, 1);
--text-on: hsla(0, 0%, 98.4%, 1);

/* Background Colors */
--bg-100: hsla(0, 0%, 98.4%, 1);
--bg-200: hsla(0, 0%, 94.9%, 1);
--bg-300: hsla(0, 0%, 89.8%, 1);
```

## 🏗️ 레이아웃 시스템

### 공통 레이아웃 컴포넌트

#### 1. Header (`src/components/layout/header.tsx`)

- **데스크탑**: 상단에 로그인/장바구니/히스토리/주문배송/마이페이지, 하단에 카테고리/홈/랭킹/숏구/이벤트 네비게이션
- **태블릿/모바일**: 로고와 검색/알림/장바구니/메뉴 아이콘

#### 2. BottomNavigation (`src/components/layout/bottom-navigation.tsx`)

- **태블릿/모바일 전용**: 홈/카테고리/히스토리/마이페이지 하단 네비게이션
- **데스크탑에서는 숨김**

#### 3. MainLayout (`src/components/layout/main-layout.tsx`)

- Header와 BottomNavigation을 포함한 전체 레이아웃
- 반응형 패딩과 높이 조정

### 사용법

```tsx
import { MainLayout } from '@/components/layout';

export default function MyPage() {
  return (
    <MainLayout>
      <div className="container py-8">{/* 페이지 콘텐츠 */}</div>
    </MainLayout>
  );
}
```

## 🛠️ 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Font**: Pretendard Variable

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 빌드

```bash
npm run build
```

## 📱 반응형 동작

### 데스크탑 (1280px+)

- 상단: 로고 + 상단 네비게이션 (로그인, 장바구니, 히스토리, 주문배송, 마이페이지)
- 하단: 카테고리, 홈, 랭킹, 숏구, 이벤트 네비게이션
- 마진: 48px

### 태블릿 (768px - 1279px)

- 상단: 로고 + 검색/알림/장바구니/메뉴 아이콘
- 하단: 홈, 카테고리, 히스토리, 마이페이지 네비게이션 (고정)
- 마진: 36px

### 모바일 (375px - 767px)

- 상단: 로고 + 검색/알림/장바구니/메뉴 아이콘
- 하단: 홈, 카테고리, 히스토리, 마이페이지 네비게이션 (고정)
- 마진: 24px

## 🎯 주요 기능

- ✅ 반응형 레이아웃 시스템
- ✅ 디자인 시스템 적용
- ✅ shadcn/ui 컴포넌트 활용
- ✅ 접근성 고려
- ✅ 모바일 최적화
- ✅ TypeScript 지원

## 📁 프로젝트 구조

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── bottom-navigation.tsx
│   │   ├── main-layout.tsx
│   │   └── index.ts
│   └── ui/
│       ├── button.tsx
│       ├── input.tsx
│       └── sheet.tsx
└── lib/
    ├── metadata.ts
    └── utils.ts
```
