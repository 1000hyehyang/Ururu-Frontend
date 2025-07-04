'use client';

import Link from 'next/link';

export function TopBar() {
  return (
    <div className="hidden bg-bg-100 desktop:block">
      <div className="container">
        <div className="flex h-12 items-center justify-end">
          <nav className="flex items-center space-x-6">
            <Link
              href="/login"
              className="text-sm text-text-200 transition-colors hover:text-text-100"
            >
              로그인
            </Link>
            <Link
              href="/cart"
              className="text-sm text-text-200 transition-colors hover:text-text-100"
            >
              장바구니
            </Link>
            <Link
              href="/history"
              className="text-sm text-text-200 transition-colors hover:text-text-100"
            >
              히스토리
            </Link>
            <Link
              href="/mypage/orders"
              className="text-sm text-text-200 transition-colors hover:text-text-100"
            >
              주문배송
            </Link>
            <Link
              href="/mypage"
              className="text-sm text-text-200 transition-colors hover:text-text-100"
            >
              마이페이지
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
