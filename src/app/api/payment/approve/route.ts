import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { paymentKey, orderId, amount } = await request.json();

    // 필수 파라미터 검증
    if (!paymentKey || !orderId || !amount) {
      return NextResponse.json({ error: '필수 파라미터가 누락되었습니다.' }, { status: 400 });
    }

    // 시크릿 키 가져오기
    const secretKey = process.env.TOSS_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json(
        { error: '토스페이먼츠 시크릿 키가 설정되지 않았습니다.' },
        { status: 500 },
      );
    }

    // 토스페이먼츠 결제 승인 API 호출
    const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${secretKey}:`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentKey,
        orderId,
        amount,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('토스페이먼츠 결제 승인 실패:', errorData);
      return NextResponse.json(
        { error: errorData.message || '결제 승인에 실패했습니다.' },
        { status: response.status },
      );
    }

    const paymentData = await response.json();
    console.log('결제 승인 성공:', paymentData);

    // 결제 성공 시 필요한 데이터만 반환
    return NextResponse.json({
      orderId: paymentData.orderId,
      paymentKey: paymentData.paymentKey,
      totalAmount: paymentData.totalAmount,
      method: paymentData.method,
      status: paymentData.status,
      approvedAt: paymentData.approvedAt,
    });
  } catch (error) {
    console.error('결제 승인 API 에러:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
