import Link from 'next/link';
import { ArrowRight, Layout, Search, CreditCard, Settings } from 'lucide-react';

export default function ExamplesPage() {
  const layoutExamples = [
    {
      title: 'FullLayout',
      description: '메인홈과 같은 완전한 레이아웃',
      icon: Layout,
      href: '/examples/full-layout',
      features: ['TopBar', 'SearchBar', 'MainNav', 'Footer', 'BottomNavigation'],
    },
    {
      title: 'MinimalLayout',
      description: '검색창, 상단메뉴, 푸터가 없는 레이아웃',
      icon: Search,
      href: '/examples/minimal-layout',
      features: ['TopBar', 'MobileHeader', 'BottomNavigation'],
    },
    {
      title: 'NoFooterLayout',
      description: '푸터가 없는 레이아웃',
      icon: CreditCard,
      href: '/examples/no-footer-layout',
      features: ['TopBar', 'SearchBar', 'MainNav', 'MobileHeader', 'BottomNavigation'],
    },
    {
      title: 'CustomLayout',
      description: '사이드바가 있는 완전 커스텀 레이아웃',
      icon: Settings,
      href: '/examples/custom-layout',
      features: ['TopBar', 'MobileHeader', '사이드바'],
    },
  ];

  return (
    <div className="space-y-8 p-8">
      <div className="mb-12 text-center">
        <h1 className="text-text-100 mb-4 text-3xl font-bold">레이아웃 시스템 예시</h1>
        <p className="text-text-200 mx-auto max-w-3xl">
          우르르 프론트엔드의 다양한 레이아웃 조합을 확인해보세요. 각 레이아웃은 실제 사용 사례에
          맞춰 설계되었습니다.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {layoutExamples.map((example) => {
          const Icon = example.icon;
          return (
            <Link
              key={example.title}
              href={example.href}
              className="bg-bg-200 hover:bg-bg-300 group rounded-lg p-6 transition-colors"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary-100 rounded-lg p-2">
                    <Icon className="text-primary-300 h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-text-100 text-xl font-bold">{example.title}</h2>
                    <p className="text-text-200 text-sm">{example.description}</p>
                  </div>
                </div>
                <ArrowRight className="text-text-300 group-hover:text-primary-300 h-5 w-5 transition-colors" />
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="text-text-100 mb-2 text-sm font-semibold">포함된 컴포넌트</h3>
                  <div className="flex flex-wrap gap-1">
                    {example.features.map((feature) => (
                      <span
                        key={feature}
                        className="bg-bg-100 text-text-200 rounded-md px-2 py-1 text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="bg-bg-200 mt-12 rounded-lg p-6">
        <h2 className="text-text-100 mb-4 text-lg font-semibold">레이아웃 시스템 특징</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <h3 className="text-text-100 mb-2 font-semibold">🎯 유연성</h3>
            <p className="text-text-200 text-sm">
              각 페이지에서 필요한 레이아웃만 선택하여 사용할 수 있습니다.
            </p>
          </div>
          <div>
            <h3 className="text-text-100 mb-2 font-semibold">♻️ 재사용성</h3>
            <p className="text-text-200 text-sm">
              컴포넌트를 조합하여 다양한 레이아웃을 쉽게 생성할 수 있습니다.
            </p>
          </div>
          <div>
            <h3 className="text-text-100 mb-2 font-semibold">🔧 확장성</h3>
            <p className="text-text-200 text-sm">
              새로운 레이아웃 요구사항에 쉽게 대응할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
