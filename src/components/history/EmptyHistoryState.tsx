'use client';

import React from 'react';
import { HISTORY_CONSTANTS } from '@/constants/history';

export function EmptyHistoryState() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="mb-4 text-6xl">🛍️</div>
      <h2 className="mb-2 text-xl font-semibold text-text-100">
        {HISTORY_CONSTANTS.PAGE.EMPTY_TITLE}
      </h2>
      <p className="text-sm text-text-200">{HISTORY_CONSTANTS.PAGE.EMPTY_DESCRIPTION}</p>
    </div>
  );
}
