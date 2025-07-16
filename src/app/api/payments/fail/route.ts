import { NextRequest, NextResponse } from 'next/server';
import { getPaymentErrorMessage } from '@/utils/paymentErrorMapping';

// 동적 라우트로 설정 (searchParams 사용을 위해)
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // 쿼리 파라미터 추출
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const message = searchParams.get('message');
    const orderId = searchParams.get('orderId');

    console.log('토스 결제 실패 리다이렉트 처리:', {
      code,
      message,
      orderId,
    });

    // TODO: 실제 백엔드 API 호출로 결제 실패 정보 저장
    // 현재는 모의 데이터로 응답

    // 실패 응답
    return NextResponse.json(
      {
        success: false,
        message: '결제에 실패했습니다',
        data: {
          errorCode: code,
          errorMessage: getPaymentErrorMessage(code, message),
          orderId,
        },
      },
      { status: 400 },
    );
  } catch (error) {
    console.error('결제 실패 처리 실패:', error);

    return NextResponse.json(
      {
        success: false,
        message: '결제 실패 처리 중 오류가 발생했습니다.',
      },
      { status: 500 },
    );
  }
}
