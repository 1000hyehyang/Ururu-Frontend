'use client';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTopButton() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-20 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-bg-300 bg-bg-100 text-text-on shadow-sm transition-all hover:bg-bg-200 desktop:hidden"
      aria-label="맨 위로 이동"
    >
      <ArrowUp className="h-5 w-5 text-text-300" />
    </button>
  );
}
