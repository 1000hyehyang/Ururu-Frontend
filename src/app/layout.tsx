import './globals.css';
import { metadata, viewport } from '@/lib/metadata';
import { MainLayout } from '@/components/layout/main-layout';

export { metadata, viewport };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Android Web App 대응용 */}
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
