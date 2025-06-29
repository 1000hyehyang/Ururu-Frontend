'use client';

import { CustomLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { testApi } from '@/services/test';
import { useState } from 'react';

export default function TestPage() {
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTestApi = async (type: 'get' | 'post' | 'health') => {
    setIsLoading(true);
    setTestResult('');

    try {
      let result;
      switch (type) {
        case 'get':
          result = await testApi.getTest();
          break;
        case 'post':
          result = await testApi.postTest({ message: 'Hello from frontend!' });
          break;
        case 'health':
          result = await testApi.healthCheck();
          break;
      }

      setTestResult(`성공: ${JSON.stringify(result, null, 2)}`);
    } catch (error: any) {
      setTestResult(`실패: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CustomLayout
      showTopBar={false}
      showSearchBar={false}
      showMainNav={false}
      showMobileHeader={false}
      showFooter={false}
      showBottomNav={false}
    >
      <div className="container py-8">
        <h1 className="mb-6 text-2xl font-bold text-text-100">API 연동 테스트</h1>
        <p className="mb-6 text-text-200">백엔드 서버와의 CORS 연동을 테스트해보세요.</p>

        {/* API 테스트 섹션 */}
        <div className="mb-8 rounded-lg bg-bg-200 p-6">
          <h2 className="mb-4 text-lg font-semibold text-text-100">API 테스트</h2>

          <div className="mb-4 flex gap-3">
            <Button
              onClick={() => handleTestApi('health')}
              disabled={isLoading}
              className="bg-primary-300 text-text-on hover:bg-primary-200"
            >
              {isLoading ? '테스트 중...' : '헬스체크'}
            </Button>
            <Button
              onClick={() => handleTestApi('get')}
              disabled={isLoading}
              className="bg-primary-300 text-text-on hover:bg-primary-200"
            >
              {isLoading ? '테스트 중...' : 'GET 테스트'}
            </Button>
            <Button
              onClick={() => handleTestApi('post')}
              disabled={isLoading}
              className="bg-primary-300 text-text-on hover:bg-primary-200"
            >
              {isLoading ? '테스트 중...' : 'POST 테스트'}
            </Button>
          </div>

          {testResult && (
            <div className="rounded-lg bg-bg-100 p-4">
              <h3 className="mb-2 font-semibold text-text-100">테스트 결과:</h3>
              <pre className="whitespace-pre-wrap text-sm text-text-200">{testResult}</pre>
            </div>
          )}
        </div>

        {/* API 정보 */}
        <div className="rounded-lg bg-bg-200 p-6">
          <h2 className="mb-4 text-lg font-semibold text-text-100">API 정보</h2>
          <div className="space-y-2 text-sm text-text-200">
            <p>• Base URL: {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'}</p>
            <p>• Timeout: 10초</p>
            <p>• Content-Type: application/json</p>
          </div>
        </div>
      </div>
    </CustomLayout>
  );
}
