import { FullLayout } from '@/components/layout';

export default function FullLayoutExample() {
  return (
    <FullLayout>
      <div className="container py-8">
        <h1 className="text-text-100 mb-6 text-2xl font-bold">FullLayout 예시</h1>
        <p className="text-text-200 mb-4">
          이 페이지는 메인홈과 같은 완전한 레이아웃을 사용합니다.
        </p>

        <div className="bg-bg-200 mb-6 rounded-lg p-6">
          <h2 className="text-text-100 mb-3 text-lg font-semibold">포함된 컴포넌트</h2>
          <ul className="text-text-200 space-y-2">
            <li>• TopBar (데스크탑 최상단 메뉴)</li>
            <li>• SearchBar (데스크탑 검색창 + 로고)</li>
            <li>• MainNav (데스크탑 상단 메뉴)</li>
            <li>• MobileHeader (모바일/태블릿 헤더)</li>
            <li>• Footer (푸터)</li>
            <li>• BottomNavigation (모바일/태블릿 하단 네비게이션)</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-bg-200 rounded-lg p-4">
              <h3 className="text-text-100 mb-2 font-semibold">상품 카드 {item}</h3>
              <p className="text-text-200 text-sm">
                이곳에 상품 정보가 표시됩니다. 메인홈과 같은 레이아웃을 사용하는 페이지의
                예시입니다.
              </p>
            </div>
          ))}
        </div>
      </div>
    </FullLayout>
  );
}
