import { CustomLayout } from '@/components/layout';
import { Settings, Users, BarChart3, Package, ShoppingCart, FileText } from 'lucide-react';

export default function CustomLayoutExample() {
  return (
    <CustomLayout
      showTopBar={false}
      showSearchBar={false}
      showMainNav={false}
      showFooter={false}
      showBottomNav={false}
    >
      <div className="flex h-full">
        {/* 사이드바 */}
        <aside className="hidden w-64 bg-bg-200 p-6 desktop:block">
          <div className="mb-8">
            <h2 className="mb-4 text-lg font-bold text-text-100">관리자 대시보드</h2>
          </div>

          <nav className="space-y-2">
            {[
              { icon: BarChart3, label: '대시보드' },
              { icon: Package, label: '상품 관리' },
              { icon: ShoppingCart, label: '주문 관리' },
              { icon: Users, label: '회원 관리' },
              { icon: FileText, label: '게시판 관리' },
              { icon: Settings, label: '설정' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className="flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-left text-text-200 transition-colors hover:bg-bg-300 hover:text-primary-300"
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* 메인 콘텐츠 */}
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="mb-2 text-2xl font-bold text-text-100">CustomLayout 예시</h1>
            <p className="text-text-200">
              이 페이지는 사이드바가 있는 완전 커스텀 레이아웃을 사용합니다. 관리자 대시보드에서
              사용합니다.
            </p>
          </div>

          <div className="mb-6 rounded-lg bg-bg-200 p-6">
            <h2 className="mb-3 text-lg font-semibold text-text-100">포함된 컴포넌트</h2>
            <ul className="space-y-2 text-text-200">
              <li>• TopBar (데스크탑 최상단 메뉴)</li>
              <li>• Header (모바일/태블릿 헤더)</li>
            </ul>

            <h2 className="mb-3 mt-4 text-lg font-semibold text-text-100">제외된 컴포넌트</h2>
            <ul className="space-y-2 text-text-200">
              <li>• SearchBar (데스크탑 검색창)</li>
              <li>• MainNav (데스크탑 상단 메뉴)</li>
              <li>• Footer (푸터)</li>
              <li>• BottomNavigation (모바일/태블릿 하단 네비게이션)</li>
            </ul>
          </div>

          {/* 대시보드 콘텐츠 */}
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: '총 주문', value: '1,234', change: '+12%', color: 'text-primary-300' },
              { title: '총 매출', value: '₩45,678,900', change: '+8%', color: 'text-green-500' },
              { title: '신규 회원', value: '567', change: '+15%', color: 'text-blue-500' },
              { title: '상품 수', value: '890', change: '+5%', color: 'text-purple-500' },
            ].map((stat) => (
              <div key={stat.title} className="rounded-lg bg-bg-200 p-6">
                <h3 className="mb-2 text-sm font-medium text-text-200">{stat.title}</h3>
                <p className="mb-1 text-2xl font-bold text-text-100">{stat.value}</p>
                <p className={`text-sm font-medium ${stat.color}`}>{stat.change}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-lg bg-bg-200 p-6">
              <h3 className="mb-4 text-lg font-semibold text-text-100">최근 주문</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((order) => (
                  <div
                    key={order}
                    className="flex items-center justify-between rounded-lg bg-bg-100 p-3"
                  >
                    <div>
                      <p className="font-medium text-text-100">주문 #{1000 + order}</p>
                      <p className="text-sm text-text-200">2024.01.0{order}</p>
                    </div>
                    <span className="font-medium text-primary-300">₩29,900</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-bg-200 p-6">
              <h3 className="mb-4 text-lg font-semibold text-text-100">인기 상품</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((product) => (
                  <div
                    key={product}
                    className="flex items-center justify-between rounded-lg bg-bg-100 p-3"
                  >
                    <div>
                      <p className="font-medium text-text-100">상품 {product}</p>
                      <p className="text-sm text-text-200">판매량: {100 + product * 50}</p>
                    </div>
                    <span className="font-medium text-primary-300">₩19,900</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </CustomLayout>
  );
}
