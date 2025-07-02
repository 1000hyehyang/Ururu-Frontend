import './globals.css';
import { metadata, viewport } from '@/lib/metadata';

export { metadata, viewport };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* 구조화된 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: '우르르',
              description: '뷰티 공동구매 커머스 플랫폼',
              url: 'https://www.ururu.shop',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://www.ururu.shop/search?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
