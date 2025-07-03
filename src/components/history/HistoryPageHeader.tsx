'use client';

import React from 'react';
import { HISTORY_CONSTANTS } from '@/constants/history';

export function HistoryPageHeader() {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-text-100 md:text-3xl">
        {HISTORY_CONSTANTS.PAGE.TITLE}
      </h1>
      <p className="mt-2 text-sm text-text-200 md:text-base">
        {HISTORY_CONSTANTS.PAGE.DESCRIPTION}
      </p>
    </div>
  );
}
