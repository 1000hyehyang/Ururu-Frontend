# 🎨 우르르 레이아웃 시스템 가이드

## 개요

우르르 프론트엔드는 다양한 페이지 레이아웃을 효율적으로 관리하기 위해 **조합 가능한 레이아웃 시스템**을 사용합니다.

## 🏗️ 레이아웃 컴포넌트 구조

### 기본 컴포넌트들

- **`TopBar`**: 데스크탑 최상단 메뉴 (로그인, 장바구니, 히스토리, 주문배송, 마이페이지)
- **`SearchBar`**: 데스크탑 검색창 (우르르 로고 + 검색창)
- **`MainNav`**: 데스크탑 상단 메뉴 (카테고리, 홈, 랭킹, 숏구, 이벤트)
- **`MobileHeader`**: 모바일/태블릿 헤더 (로고 + 검색/알림/장바구니 아이콘)
- **`BottomNavigation`**: 모바일/태블릿 하단 네비게이션
- **`Footer`**: 푸터

### 레이아웃 조합 컴포넌트들

- **`FullLayout`**: 완전한 레이아웃 (모든 컴포넌트 포함)
- **`MinimalLayout`**: 최소 레이아웃 (검색창, 상단메뉴, 푸터 제외)
- **`NoFooterLayout`**: 푸터 없는 레이아웃
- **`CustomLayout`**: 완전 커스텀 레이아웃 (각 컴포넌트 선택 가능)

## 📱 반응형 디자인

### 데스크탑 (desktop: 1280px 이상)

- TopBar + SearchBar + MainNav + Footer

### 태블릿 (tablet: 768px 이상)

- MobileHeader + BottomNavigation + Footer

### 모바일 (mobile: 375px 이상)

- MobileHeader + BottomNavigation + Footer

## 🎯 사용 예시

### 1. 메인홈과 같은 완전한 레이아웃

```tsx
import { FullLayout } from '@/components/layout';

export default function HomePage() {
  return (
    <FullLayout>
      <div className="container py-8">
        <h1>메인 홈페이지</h1>
      </div>
    </FullLayout>
  );
}
```

### 2. 검색창과 상단메뉴, 푸터가 없는 레이아웃

```tsx
import { MinimalLayout } from '@/components/layout';

export default function ProductPage() {
  return (
    <MinimalLayout>
      <div className="container py-8">
        <h1>상품 상세 페이지</h1>
      </div>
    </MinimalLayout>
  );
}
```

### 3. 푸터가 없는 레이아웃

```tsx
import { NoFooterLayout } from '@/components/layout';

export default function CheckoutPage() {
  return (
    <NoFooterLayout>
      <div className="container py-8">
        <h1>결제 페이지</h1>
      </div>
    </NoFooterLayout>
  );
}
```

### 4. 사이드바가 있는 커스텀 레이아웃

```tsx
import { CustomLayout } from '@/components/layout';

export default function DashboardPage() {
  return (
    <CustomLayout
      showTopBar={true}
      showSearchBar={false}
      showMainNav={false}
      showFooter={false}
      showBottomNav={false}
    >
      <div className="flex">
        <aside className="bg-bg-200 w-64 p-4">
          <h2>사이드바</h2>
        </aside>
        <main className="flex-1 p-8">
          <h1>대시보드</h1>
        </main>
      </div>
    </CustomLayout>
  );
}
```

### 반응형 브레이크포인트

- `mobile`: 375px 이상
- `tablet`: 768px 이상
- `desktop`: 1280px 이상

## 🚀 확장 방법

새로운 레이아웃이 필요한 경우:

1. **기존 컴포넌트 조합**: `CustomLayout` 사용
2. **새로운 레이아웃 컴포넌트**: `layouts.tsx`에 추가
3. **완전히 새로운 구조**: 별도 레이아웃 파일 생성

```tsx
// 새로운 레이아웃 예시
export function SidebarLayout({ children }: BaseLayoutProps) {
  return (
    <div className="bg-bg-100 min-h-screen">
      <TopBar />
      <MobileHeader />
      <div className="flex">
        <aside className="desktop:block bg-bg-200 hidden w-64">{/* 사이드바 내용 */}</aside>
        <main className="desktop:pb-0 flex-1 pb-16">{children}</main>
      </div>
      <BottomNavigation />
    </div>
  );
}
```
