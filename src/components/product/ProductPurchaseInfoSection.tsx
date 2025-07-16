import React from 'react';
import type { Product } from '@/types/product';
import { productInfoNoticeRows, exchangeRefundNoticeRows } from '@/data/product-info-notice';

interface InfoTableProps {
  rows: { label: string; value: string }[];
}

function InfoTable({ rows }: InfoTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-separate border-spacing-0">
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="align-top">
              <th className="w-1/3 min-w-[120px] border-b border-bg-200 bg-bg-200 px-6 py-4 text-left align-top text-sm font-semibold text-text-200">
                {row.label}
              </th>
              <td className="w-2/3 whitespace-pre-line border-b border-bg-200 bg-bg-100 px-6 py-4 align-top text-sm text-text-100">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ProductInfoNoticeSection({ product }: { product: Product }) {
  // 공동구매 옵션의 fullIngredients를 순서대로 결합
  const allIngredients = product.options
    .map((option, index) => {
      if (!option.fullIngredients || option.fullIngredients.trim() === '') {
        return null;
      }
      return `${index + 1}. ${option.name}\n${option.fullIngredients}`;
    })
    .filter(Boolean)
    .join('\n\n');



  // 기본 productInfoNoticeRows에서 성분 정보, 용량 정보, 제품 사양, 사용기한, 사용방법, 제조업자, 판매업자, 제조국, 기능성 화장품 여부, 주의사항, 품질보증기준, 소비자상담 전화번호를 동적으로 교체
  const dynamicProductInfoRows = productInfoNoticeRows.map((row) => {
    if (row.label === '화장품법에 따라 기재해야 하는 모든 성분') {
      return {
        ...row,
        value: allIngredients || '성분 정보가 없습니다.',
      };
    }
    if (row.label === '내용물의 용량 또는 중량') {
      return {
        ...row,
        value: product.capacity || '용량 정보가 없습니다.',
      };
    }
    if (row.label === '제품 주요 사양') {
      return {
        ...row,
        value: product.specification || '제품 사양 정보가 없습니다.',
      };
    }
    if (row.label === '사용기한(또는 개봉 후 사용기간)') {
      return {
        ...row,
        value: product.expiryDate || '사용기한 정보가 없습니다.',
      };
    }
    if (row.label === '사용방법') {
      return {
        ...row,
        value: product.usage || '사용방법 정보가 없습니다.',
      };
    }
    if (row.label === '화장품제조업자, 화장품책임판매업자 및 화장품 판매업자') {
      const manufacturer = product.manufacturer || '제조업자 정보 없음';
      const seller = product.seller || '판매업자 정보 없음';
      return {
        ...row,
        value: `${manufacturer} / ${seller}`,
      };
    }
    if (row.label === '제조국') {
      return {
        ...row,
        value: product.country || '제조국 정보가 없습니다.',
      };
    }
    if (row.label === '기능성 화장품 식품의약품안전처 심사필 여부') {
      const functionalTestValue =
        product.functionalTest === 'yes'
          ? '해당사항 있음'
          : product.functionalTest === 'no'
            ? '해당사항 없음'
            : '기능성 화장품 여부 정보가 없습니다.';
      return {
        ...row,
        value: functionalTestValue,
      };
    }
    if (row.label === '사용할 때의 주의사항') {
      return {
        ...row,
        value: product.precautions || '주의사항 정보가 없습니다.',
      };
    }
    if (row.label === '품질보증기준') {
      return {
        ...row,
        value: product.qualityStandard || '품질보증기준 정보가 없습니다.',
      };
    }
    if (row.label === '소비자상담 전화번호') {
      return {
        ...row,
        value: product.customerService || '소비자상담 전화번호 정보가 없습니다.',
      };
    }
    return row;
  });

  return (
    <section className="mb-10 rounded-xl bg-bg-100 p-0 shadow-none">
      <h2 className="border-b border-bg-200 px-6 pb-4 pt-6 text-lg font-bold text-text-100">
        상품정보 제공고시
      </h2>
      <InfoTable rows={dynamicProductInfoRows} />
    </section>
  );
}

function ProductExchangeRefundSection() {
  return (
    <section className="rounded-xl bg-bg-100 p-0 shadow-none">
      <h2 className="border-b border-bg-200 px-6 pb-4 pt-6 text-lg font-bold text-text-100">
        교환/반품/환불 안내
      </h2>
      <InfoTable rows={exchangeRefundNoticeRows} />
    </section>
  );
}

interface ProductPurchaseInfoSectionProps {
  product: Product;
}

export function ProductPurchaseInfoSection({ product }: ProductPurchaseInfoSectionProps) {
  return (
    <div className="mt-8 flex flex-col gap-8">
      <ProductInfoNoticeSection product={product} />
      <ProductExchangeRefundSection />
    </div>
  );
}
