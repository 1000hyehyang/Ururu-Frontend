'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ErrorDialog } from './ErrorDialog';

export const WithdrawnMemberAlert = () => {
  const searchParams = useSearchParams();
  const [showWithdrawnDialog, setShowWithdrawnDialog] = useState(false);

  useEffect(() => {
    // URL 파라미터에서 탈퇴한 회원 정보 확인
    const result = searchParams.get('result');
    const reason = searchParams.get('reason');
    const provider = searchParams.get('provider');

    // 탈퇴한 회원인 경우 다이얼로그 표시
    if (result === 'error' && reason === 'withdrawn_member') {
      // 약간의 지연을 두어 페이지 로딩 후 표시
      setTimeout(() => {
        setShowWithdrawnDialog(true);
      }, 500);
    }
  }, [searchParams]);

  const handleCloseDialog = () => {
    setShowWithdrawnDialog(false);
    // URL에서 파라미터 제거 (브라우저 히스토리 정리)
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('result');
      url.searchParams.delete('reason');
      url.searchParams.delete('provider');
      window.history.replaceState({}, '', url.toString());
    }
  };

  return (
    <ErrorDialog
      isOpen={showWithdrawnDialog}
      onClose={handleCloseDialog}
      title="탈퇴한 회원"
      message="이미 탈퇴한 회원입니다. 다시 가입해주세요."
    />
  );
};
