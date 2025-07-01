import { Button } from '@/components/ui/button';
import { MyPageLayout } from '@/components/mypage/MyPageLayout';
import { AddressCard } from '@/components/mypage/address';
import Link from 'next/link';
import Image from 'next/image';
import { FORM_STYLES } from '@/constants/form-styles';
import { addressListData } from '@/data/address';
import { cn } from '@/lib/utils';

export default function AddressListPage() {
  return (
    <MyPageLayout>
      {/* 타이틀 */}
      <h1 className="mb-6 text-center text-2xl font-semibold md:text-2xl">배송지 관리</h1>

      {/* 안내 배너 */}
      <div className="mb-6 flex items-start gap-3 rounded-lg bg-bg-100 p-6 shadow-sm">
        <Image
          src="/ururu-gradient.svg"
          alt="우르르"
          width={24}
          height={24}
          className="h-6 w-6 flex-shrink-0"
        />
        <div className="flex-1">
          <p className="text-sm font-medium text-text-300">
            배송지는 최대 5개까지 등록할 수 있어요
          </p>
        </div>
      </div>

      {/* 배송지 리스트 */}
      <div className="flex flex-col gap-4">
        {addressListData.map((address) => (
          <AddressCard key={address.id} address={address} />
        ))}
      </div>

      {/* 배송지 추가 버튼 */}
      <div className="mb-4">
        <Link href="/mypage/address/register">
          <Button
            variant="outline"
            className={cn(
              'h-12 w-full rounded-lg border-bg-300 bg-bg-100 text-text-300 transition-colors hover:border-primary-300 hover:bg-bg-100 hover:text-primary-300',
            )}
          >
            배송지 추가하기
          </Button>
        </Link>
      </div>
    </MyPageLayout>
  );
}
