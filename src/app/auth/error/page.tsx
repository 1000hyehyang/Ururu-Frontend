'use client';

import { useSearchParams, useRouter } from 'next/navigation';

export default function AuthError() {
  const params = useSearchParams();
  const router = useRouter();
  const message = params.get('message') || '로그인 중 오류가 발생했습니다.';

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-red-600">로그인 실패</h2>
        <p className="mt-2 text-gray-600">{message}</p>
        <button
          onClick={() => router.push('/login')}
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
}
