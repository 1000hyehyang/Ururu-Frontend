import React from 'react';
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

function ProductInfoNoticeSection() {
  return (
    <section className="mb-10 rounded-xl bg-bg-100 p-0 shadow-none">
      <h2 className="border-b border-bg-200 px-6 pb-4 pt-6 text-lg font-bold text-text-100">
        상품정보 제공고시
      </h2>
      <InfoTable rows={productInfoNoticeRows} />
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

export function ProductPurchaseInfoSection() {
  return (
    <div className="mt-8 flex flex-col gap-8">
      <ProductInfoNoticeSection />
      <ProductExchangeRefundSection />
    </div>
  );
}
