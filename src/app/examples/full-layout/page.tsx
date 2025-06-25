import { FullLayout } from '@/components/layout';

export default function FullLayoutExample() {
  return (
    <FullLayout>
      <div className="container py-8">
        <h1 className="mb-6 text-2xl font-bold text-text-100">FullLayout 예시</h1>
        <p className="mb-4 text-text-200">
          이 페이지는 메인홈과 같은 완전한 레이아웃을 사용합니다.
        </p>

        <div className="mb-6 rounded-lg bg-bg-200 p-6">
          <h2 className="mb-3 text-lg font-semibold text-text-100">포함된 컴포넌트</h2>
          <ul className="space-y-2 text-text-200">
            <li>• TopBar (데스크탑 최상단 메뉴)</li>
            <li>• SearchBar (데스크탑 검색창 + 로고)</li>
            <li>• MainNav (데스크탑 상단 메뉴)</li>
            <li>• Header (모바일/태블릿 헤더)</li>
            <li>• Footer (푸터)</li>
            <li>• BottomNavigation (모바일/태블릿 하단 네비게이션)</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="rounded-lg bg-bg-200 p-4">
              <h3 className="mb-2 font-semibold text-text-100">상품 카드 {item}</h3>
              <p className="text-sm text-text-200">
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
