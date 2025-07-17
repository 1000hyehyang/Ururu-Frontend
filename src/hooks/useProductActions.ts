import { createGroupBuyOrder } from '@/services/groupbuyService';
import { addItemsToCart } from '@/services/cartService';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { SelectedOption } from '@/types/product';
import type { ProductOption } from '@/types/product';

export const useProductActions = () => {
  const router = useRouter();

  const handleShare = () => {
    // 공유 로직
    // TODO: 실제 공유 기능 구현
  };

  // groupbuyId, selectedOptions를 인자로 받음
  const handleAddToCart = async (
    selectedOptions: SelectedOption[],
    productOptions?: ProductOption[],
  ) => {
    if (!selectedOptions.length) {
      toast.error('옵션을 선택해 주세요.');
      return;
    }
    try {
      const items = selectedOptions.map((opt) => ({
        groupbuyOptionId: Number(opt.value),
        quantity: opt.quantity,
      }));
      const result = await addItemsToCart(items);
      if (result.success) {
        toast.success('장바구니에 추가되었습니다!');
      } else {
        let errorMessage = result.message || '장바구니 담기에 실패했습니다.';
        // %d 치환 로직
        if (errorMessage.includes('%d') && productOptions) {
          // 여러 옵션 중 가장 작은 maxQuantity를 사용 (보통 동일 제한)
          const maxQ = Math.min(
            ...selectedOptions.map((opt) => {
              const found = productOptions.find((po) => String(po.id) === opt.value);
              return found?.maxQuantity ?? 1;
            }),
          );
          errorMessage = errorMessage.replace('%d', String(maxQ));
        }
        toast.error(errorMessage);
      }
    } catch (error: any) {
      let errorMessage =
        error?.response?.data?.message || error.message || '장바구니 담기 중 오류가 발생했습니다.';
      // %d 치환 로직 (catch 블록에서도)
      if (errorMessage.includes('%d') && productOptions) {
        const maxQ = Math.min(
          ...selectedOptions.map((opt) => {
            const found = productOptions.find((po) => String(po.id) === opt.value);
            return found?.maxQuantity ?? 1;
          }),
        );
        errorMessage = errorMessage.replace('%d', String(maxQ));
      }
      toast.error(errorMessage);
    }
  };

  const handleBuyNow = async (groupbuyId: string | number, selectedOptions: SelectedOption[]) => {
    if (!groupbuyId || !selectedOptions.length) {
      toast.error('옵션을 선택해 주세요.');
      return;
    }
    try {
      const orderItems = selectedOptions.map((opt) => ({
        groupbuyOptionId: Number(opt.value),
        quantity: opt.quantity,
      }));
      const result = await createGroupBuyOrder({ groupbuyId, orderItems });
      if (result.success) {
        toast.success('주문이 생성되었습니다!');
        // 주문 생성 전 현재 페이지 저장 (만료 시 돌아갈 페이지)
        sessionStorage.setItem('orderReferrer', window.location.pathname);
        // 주문 데이터에 생성 시간 추가
        const orderDataWithTimestamp = {
          ...result.data,
          createdAt: Date.now(),
        };
        // 주문 데이터를 sessionStorage에 저장
        sessionStorage.setItem('orderData', JSON.stringify(orderDataWithTimestamp));
        // 주문 생성 성공 시 order 페이지로 이동
        router.push(`/order/${result.data.orderId}`);
      } else {
        toast.error(result.message || '주문 생성에 실패했습니다.');
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || error.message || '주문 생성 중 오류가 발생했습니다.',
      );
    }
  };

  const handlePurchase = () => {
    // 구매 로직
    // TODO: 실제 구매 기능 구현
  };

  return {
    handleShare,
    handleAddToCart,
    handleBuyNow,
    handlePurchase,
  };
};
