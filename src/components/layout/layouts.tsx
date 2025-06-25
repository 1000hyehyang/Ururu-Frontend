import { ReactNode } from 'react';
import { TopBar } from './top-bar';
import { SearchBar } from './search-bar';
import { MainNav } from './main-nav';
import { MobileHeader } from './mobile-header';
import { BottomNavigation } from './bottom-navigation';
import { Footer } from './footer';

interface BaseLayoutProps {
  children: ReactNode;
  className?: string;
}

// 1. 완전한 레이아웃 (메인홈과 같은)
export function FullLayout({ children, className = '' }: BaseLayoutProps) {
  return (
    <div className={`bg-bg-100 min-h-screen ${className}`}>
      <TopBar />
      <SearchBar />
      <MainNav />
      <MobileHeader />
      <main className="desktop:pb-0 min-h-[calc(100vh-4rem)] pb-16">{children}</main>
      <Footer />
      <BottomNavigation />
    </div>
  );
}

// 2. 검색창과 상단메뉴, 푸터가 없는 레이아웃
export function MinimalLayout({ children, className = '' }: BaseLayoutProps) {
  return (
    <div className={`bg-bg-100 min-h-screen ${className}`}>
      <TopBar />
      <MobileHeader />
      <main className="desktop:pb-0 min-h-[calc(100vh-4rem)] pb-16">{children}</main>
      <BottomNavigation />
    </div>
  );
}

// 3. 푸터가 없는 레이아웃
export function NoFooterLayout({ children, className = '' }: BaseLayoutProps) {
  return (
    <div className={`bg-bg-100 min-h-screen ${className}`}>
      <TopBar />
      <SearchBar />
      <MainNav />
      <MobileHeader />
      <main className="desktop:pb-0 min-h-[calc(100vh-4rem)] pb-16">{children}</main>
      <BottomNavigation />
    </div>
  );
}

// 4. 커스텀 레이아웃 (사이드바 등이 있는 경우)
export function CustomLayout({
  children,
  className = '',
  showTopBar = false,
  showSearchBar = false,
  showMainNav = false,
  showMobileHeader = true,
  showFooter = false,
  showBottomNav = true,
}: BaseLayoutProps & {
  showTopBar?: boolean;
  showSearchBar?: boolean;
  showMainNav?: boolean;
  showMobileHeader?: boolean;
  showFooter?: boolean;
  showBottomNav?: boolean;
}) {
  return (
    <div className={`bg-bg-100 min-h-screen ${className}`}>
      {showTopBar && <TopBar />}
      {showSearchBar && <SearchBar />}
      {showMainNav && <MainNav />}
      {showMobileHeader && <MobileHeader />}
      <main className="desktop:pb-0 min-h-[calc(100vh-4rem)] pb-16">{children}</main>
      {showFooter && <Footer />}
      {showBottomNav && <BottomNavigation />}
    </div>
  );
}
