import './globals.css';
import { ReactNode } from 'react';
import { metadata, viewport } from '@/lib/metadata';
import AuthHydrator from './AuthHydrator';

export { metadata, viewport };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head />
      <body>
        <AuthHydrator>{children}</AuthHydrator>
      </body>
    </html>
  );
}
