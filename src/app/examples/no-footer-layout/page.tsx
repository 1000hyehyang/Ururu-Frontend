import { NoFooterLayout } from '@/components/layout';

export default function NoFooterLayoutExample() {
  return (
    <NoFooterLayout>
      <div className="container py-8">
        <h1 className="text-text-100 mb-6 text-2xl font-bold">NoFooterLayout 예시</h1>
        <p className="text-text-200 mb-4">
          이 페이지는 푸터가 없는 레이아웃을 사용합니다. 결제 페이지나 로그인 페이지에서 사용합니다.
        </p>

        <div className="bg-bg-200 mb-6 rounded-lg p-6">
          <h2 className="text-text-100 mb-3 text-lg font-semibold">포함된 컴포넌트</h2>
          <ul className="text-text-200 space-y-2">
            <li>• TopBar (데스크탑 최상단 메뉴)</li>
            <li>• SearchBar (데스크탑 검색창 + 로고)</li>
            <li>• MainNav (데스크탑 상단 메뉴)</li>
            <li>• MobileHeader (모바일/태블릿 헤더)</li>
            <li>• BottomNavigation (모바일/태블릿 하단 네비게이션)</li>
          </ul>

          <h2 className="text-text-100 mb-3 mt-4 text-lg font-semibold">제외된 컴포넌트</h2>
          <ul className="text-text-200 space-y-2">
            <li>• Footer (푸터)</li>
          </ul>
        </div>

        {/* 결제 페이지 시뮬레이션 */}
        <div className="mx-auto max-w-2xl">
          <div className="bg-bg-200 mb-6 rounded-lg p-6">
            <h2 className="text-text-100 mb-4 text-xl font-bold">결제 정보</h2>

            <div className="space-y-4">
              <div>
                <label className="text-text-200 mb-2 block text-sm font-medium">카드 번호</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="border-bg-300 bg-bg-100 text-text-100 w-full rounded-lg border p-3"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-text-200 mb-2 block text-sm font-medium">만료일</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="border-bg-300 bg-bg-100 text-text-100 w-full rounded-lg border p-3"
                  />
                </div>
                <div>
                  <label className="text-text-200 mb-2 block text-sm font-medium">CVC</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="border-bg-300 bg-bg-100 text-text-100 w-full rounded-lg border p-3"
                  />
                </div>
              </div>

              <div>
                <label className="text-text-200 mb-2 block text-sm font-medium">
                  카드 소유자명
                </label>
                <input
                  type="text"
                  placeholder="홍길동"
                  className="border-bg-300 bg-bg-100 text-text-100 w-full rounded-lg border p-3"
                />
              </div>
            </div>
          </div>

          <div className="bg-bg-200 rounded-lg p-6">
            <h2 className="text-text-100 mb-4 text-xl font-bold">주문 요약</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-text-200">상품 금액:</span>
                <span className="text-text-100">₩29,900</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-200">배송비:</span>
                <span className="text-text-100">무료</span>
              </div>
              <div className="border-bg-300 mt-2 border-t pt-2">
                <div className="flex justify-between font-bold">
                  <span className="text-text-100">총 결제금액:</span>
                  <span className="text-primary-300">₩29,900</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NoFooterLayout>
  );
}
