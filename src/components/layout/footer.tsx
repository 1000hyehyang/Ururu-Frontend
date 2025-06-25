'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const BIZ_INFO = [
  { label: '상호명', value: '(주)밤코딩단' },
  { label: '대표자', value: '이상민' },
  { label: '주소', value: '서울특별시 서초구 반포대로 45 4층' },
  { label: '고객센터', value: '1234-5678' },
  { label: '고객센터 운영시간', value: '평일 09:30 ~ 18:00' },
  { label: '사업자등록번호', value: '123-45-67890' },
  { label: '전자우편', value: 'cs@ururu.co.kr' },
  { label: '통신판매업신고', value: '제 2025-서울서초-1234 호' },
];

const FOOTER_LINKS = [
  { label: '사업자정보확인', href: '#', isExternal: true },
  { label: '이용약관', href: '/terms', isExternal: false },
  { label: '개인정보처리방침', href: '/privacy', isExternal: false },
  { label: '1:1 문의', href: '/contact', isExternal: false },
  { label: '광고/제휴문의', href: '#', isExternal: true },
];

export function Footer() {
  const [open, setOpen] = useState(false);

  return (
    <footer
      className="bg-bg-100 pb-12 pt-12 text-center text-text-300"
      style={{
        // 모바일/태블릿에서 하단 내비게이션 높이만큼 여유 padding
        paddingBottom: 'max(48px, env(safe-area-inset-bottom, 0px) + 48px)',
      }}
    >
      <div className="mx-auto flex max-w-[1200px] flex-col items-center px-5">
        {/* 로고 & 사업자 정보 토글 */}
        <div className="mb-6 flex items-center gap-3">
          <Image
            src="/ururu-full-logo.png"
            alt="우르르"
            width={180}
            height={40}
            className="h-auto w-[96px] tablet:w-[96px] desktop:w-[128px]"
            sizes="(max-width: 768px) 96px, (max-width: 1024px) 96px, 128px"
            priority
          />
          <button
            type="button"
            className="flex items-center gap-1 text-[10px] font-medium text-text-200 transition-colors hover:text-primary-300 tablet:text-xs desktop:text-sm"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="footer-biz-info"
            style={{ fontWeight: 500 }}
          >
            사업자 정보
            <ChevronDown
              className={`ml-1 h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : 'rotate-0'}`}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* 사업자 정보 상세 (토글) */}
        {open && (
          <div
            id="footer-biz-info"
            className="mb-8 w-full max-w-[1280px] rounded-xl bg-bg-200 px-8 py-10 text-left shadow-sm"
          >
            <div className="flex flex-col gap-y-1 tablet:gap-y-2 desktop:gap-y-2">
              {BIZ_INFO.map((item) => (
                <div
                  key={item.label}
                  className="flex min-h-[20px] text-[10px] tablet:min-h-[28px] tablet:text-xs desktop:min-h-[28px] desktop:text-sm"
                >
                  <div className="mr-4 w-[120px] min-w-[80px] font-medium text-text-200">
                    {item.label}
                  </div>
                  <div className="text-text-100">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 하단 링크 */}
        <nav className="mb-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[10px] font-medium text-text-300 tablet:text-xs desktop:text-sm">
          {FOOTER_LINKS.map((link) => {
            if (link.isExternal) {
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-text-300 transition-colors hover:text-primary-300"
                >
                  {link.label}
                </a>
              );
            }
            return (
              <Link
                key={link.label}
                href={link.href}
                className="text-text-300 transition-colors hover:text-primary-300"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* 안내문구 */}
        <div className="mx-auto mb-2 max-w-7xl text-[10px] font-normal leading-relaxed text-text-300 tablet:text-xs desktop:text-sm">
          (주)밤코딩단은 결제정보의 중개서비스 또는 통신판매중개시스템의 제공자로서, 통신판매의
          당사자가 아니며 제공 정보의 오류로 인해 발생하는 모든 손해 및 상품의 주문, 배송 및 환불
          등과 관련한 의무와 책임은 각 판매자에게 있습니다.
        </div>

        {/* 저작권 */}
        <div className="text-[10px] font-normal text-text-300 tablet:text-xs desktop:text-sm">
          © BamCodingDan Inc. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
