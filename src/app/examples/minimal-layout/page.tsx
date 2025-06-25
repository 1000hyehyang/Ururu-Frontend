import { MinimalLayout } from '@/components/layout';

export default function MinimalLayoutExample() {
  return (
    <MinimalLayout>
      <div className="container py-8">
        <h1 className="mb-6 text-2xl font-bold text-text-100">MinimalLayout 예시</h1>
        <p className="mb-4 text-text-200">
          이 페이지는 검색창, 상단메뉴, 푸터가 없는 최소한의 레이아웃을 사용합니다.
        </p>

        <div className="mb-6 rounded-lg bg-bg-200 p-6">
          <h2 className="mb-3 text-lg font-semibold text-text-100">포함된 컴포넌트</h2>
          <ul className="space-y-2 text-text-200">
            <li>• TopBar (데스크탑 최상단 메뉴)</li>
            <li>• Header (모바일/태블릿 헤더)</li>
            <li>• BottomNavigation (모바일/태블릿 하단 네비게이션)</li>
          </ul>

          <h2 className="mb-3 mt-4 text-lg font-semibold text-text-100">제외된 컴포넌트</h2>
          <ul className="space-y-2 text-text-200">
            <li>• SearchBar (데스크탑 검색창)</li>
            <li>• MainNav (데스크탑 상단 메뉴)</li>
            <li>• Footer (푸터)</li>
          </ul>
        </div>

        {/* 상품 상세 페이지 시뮬레이션 */}
        <div className="mb-6 rounded-lg bg-bg-200 p-6">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* 상품 이미지 */}
            <div className="lg:w-1/2">
              <div className="flex h-80 items-center justify-center rounded-lg bg-bg-300">
                <span className="text-text-300">상품 이미지</span>
              </div>
            </div>

            {/* 상품 정보 */}
            <div className="lg:w-1/2">
              <h2 className="mb-4 text-xl font-bold text-text-100">상품명</h2>
              <p className="mb-4 text-text-200">
                이곳에 상품 상세 정보가 표시됩니다. 상품 상세 페이지나 검색 결과 페이지에서 사용하는
                레이아웃입니다.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-text-200">가격:</span>
                  <span className="font-semibold text-primary-300">₩29,900</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-200">배송비:</span>
                  <span className="text-text-200">무료</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MinimalLayout>
  );
}
